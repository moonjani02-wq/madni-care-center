param(
  [int]$Port = 8080,
  [string]$AdminPassword = "7860",
  # Live site: browser on another origin needs CORS. Examples: *  OR  https://yoursite.netlify.app  OR  https://a.com,https://b.com
  [string]$CorsOrigin = "",
  # Listen on all interfaces (needs Admin URL ACL once). Default localhost only.
  [switch]$ListenAll = $false
)

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$DataPath = Join-Path $Root "data\store.json"

function Read-Store {
  if (!(Test-Path $DataPath)) {
    return @{ pricingOverrides = @{}; userProducts = @() }
  }
  $raw = Get-Content $DataPath -Raw
  if ([string]::IsNullOrWhiteSpace($raw)) {
    return @{ pricingOverrides = @{}; userProducts = @() }
  }
  $parsed = $raw | ConvertFrom-Json
  if ($null -eq $parsed.pricingOverrides) { $parsed | Add-Member -NotePropertyName pricingOverrides -NotePropertyValue @{} -Force }
  if ($null -eq $parsed.userProducts) { $parsed | Add-Member -NotePropertyName userProducts -NotePropertyValue @() -Force }
  if ($parsed.PSObject.Properties.Name -contains 'stockLevels') {
    $parsed.PSObject.Properties.Remove('stockLevels')
  }
  return $parsed
}

function Write-Store([object]$Store) {
  $json = $Store | ConvertTo-Json -Depth 12
  Set-Content -Path $DataPath -Value $json -Encoding UTF8
}

function Get-ContentType([string]$Path) {
  $ext = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
  switch ($ext) {
    ".html" { return "text/html; charset=utf-8" }
    ".js" { return "text/javascript; charset=utf-8" }
    ".css" { return "text/css; charset=utf-8" }
    ".json" { return "application/json; charset=utf-8" }
    ".svg" { return "image/svg+xml; charset=utf-8" }
    ".png" { return "image/png" }
    ".jpg" { return "image/jpeg" }
    ".jpeg" { return "image/jpeg" }
    ".gif" { return "image/gif" }
    ".webp" { return "image/webp" }
    ".txt" { return "text/plain; charset=utf-8" }
    default { return "application/octet-stream" }
  }
}

function Send-Json($Response, [int]$StatusCode, [object]$Obj) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes(( $Obj | ConvertTo-Json -Depth 12 ))
  $Response.StatusCode = $StatusCode
  $Response.ContentType = "application/json; charset=utf-8"
  $Response.ContentLength64 = $bytes.Length
  $Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $Response.OutputStream.Close()
}

function Send-Text($Response, [int]$StatusCode, [string]$Text) {
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)
  $Response.StatusCode = $StatusCode
  $Response.ContentType = "text/plain; charset=utf-8"
  $Response.ContentLength64 = $bytes.Length
  $Response.OutputStream.Write($bytes, 0, $bytes.Length)
  $Response.OutputStream.Close()
}

function Require-Admin([System.Net.HttpListenerRequest]$Request) {
  $header = $Request.Headers["X-Admin-Password"]
  if ([string]::IsNullOrWhiteSpace($header) -or $header -ne $AdminPassword) {
    return $false
  }
  return $true
}

function Apply-CorsHeaders([System.Net.HttpListenerResponse]$Response, [System.Net.HttpListenerRequest]$Request) {
  if ([string]::IsNullOrWhiteSpace($CorsOrigin)) { return }
  $raw = $CorsOrigin.Trim()
  $reqO = [string]$Request.Headers["Origin"]
  $send = ""
  if ($raw -eq "*") {
    $send = "*"
  }
  elseif ($raw -match ",") {
    $parts = @($raw -split "," | ForEach-Object { $_.Trim() } | Where-Object { $_ })
    if (-not [string]::IsNullOrWhiteSpace($reqO) -and $parts -contains $reqO) { $send = $reqO }
  }
  elseif ($raw -eq $reqO) {
    $send = $reqO
  }
  if ([string]::IsNullOrWhiteSpace($send)) { return }
  [void]$Response.Headers.Set("Access-Control-Allow-Origin", $send)
  [void]$Response.Headers.Set("Access-Control-Allow-Headers", "Content-Type, X-Admin-Password")
  [void]$Response.Headers.Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
}

$listener = New-Object System.Net.HttpListener
$bindHost = if ($ListenAll) { "+" } else { "localhost" }
$prefix = "http://{0}:{1}/" -f $bindHost, $Port
$listener.Prefixes.Add($prefix) | Out-Null
try {
  $listener.Start()
}
catch {
  Write-Host "ERROR: Could not start HTTP listener on $prefix"
  Write-Host $_.Exception.Message
  Write-Host ""
  Write-Host "If you see 'Access is denied' or URL reservation errors, run ONCE in Admin PowerShell:"
  Write-Host ('  netsh http add urlacl url={0} user={1}' -f $prefix, $env:USERNAME)
  Write-Host ""
  exit 1
}
Write-Host "Server running at $prefix"
Write-Host "API: ${prefix}api/pricing-overrides (GET) | ${prefix}api/user-products (GET) | ${prefix}api/products/update (POST)"
Write-Host "Legacy admin page: ${prefix}admin  (opens admin.html)"
Write-Host "Admin writes need header X-Admin-Password (see param AdminPassword in this script)."
if ($ListenAll) {
  Write-Host "ListenAll: use your PC IP and port $Port from other devices. URL ACL (Admin PowerShell once): netsh http add urlacl url=http://+:$Port/ user=$env:USERNAME"
}
if (-not [string]::IsNullOrWhiteSpace($CorsOrigin)) {
  Write-Host "CORS enabled for live front-end (Origin filter): $CorsOrigin"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response

  $path = $request.Url.AbsolutePath

  try {
    # ---- API routes ----
    if ($path.StartsWith("/api/")) {
      if ($request.HttpMethod -eq "OPTIONS") {
        Apply-CorsHeaders $response $request
        $response.StatusCode = 204
        $response.OutputStream.Close()
        continue
      }

      Apply-CorsHeaders $response $request
      $store = Read-Store

      if ($path -eq "/api/pricing-overrides" -and $request.HttpMethod -eq "GET") {
        Send-Json $response 200 $store.pricingOverrides
        continue
      }

      if ($path -eq "/api/user-products" -and $request.HttpMethod -eq "GET") {
        Send-Json $response 200 $store.userProducts
        continue
      }

      if ($path -eq "/api/pricing-overrides" -and $request.HttpMethod -eq "POST") {
        if (-not (Require-Admin $request)) {
          Send-Text $response 401 "Unauthorized"
          continue
        }

        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        $json = $null
        if (-not [string]::IsNullOrWhiteSpace($body)) { $json = $body | ConvertFrom-Json }
        if ($null -eq $json -or $null -eq $json.overrides) {
          Send-Text $response 400 "Missing overrides"
          continue
        }

        # overrides: { productId: { price: number, compareAt: number|null } }
        foreach ($entry in $json.overrides.PSObject.Properties) {
          $productId = $entry.Name
          $val = $entry.Value
          $price = [double]$val.price
          $compareAt = $null
          if ($null -ne $val.compareAt) { $compareAt = [double]$val.compareAt }
          if ($price -lt 0) { continue }

          if ($null -eq $compareAt) {
            $store.pricingOverrides[$productId] = @{ price = $price }
          } else {
            $store.pricingOverrides[$productId] = @{ price = $price; compareAt = $compareAt }
          }
        }

        Write-Store $store
        Send-Json $response 200 @{ ok = $true }
        continue
      }

      if ($path -eq "/api/products" -and $request.HttpMethod -eq "POST") {
        if (-not (Require-Admin $request)) {
          Send-Text $response 401 "Unauthorized"
          continue
        }

        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        if ([string]::IsNullOrWhiteSpace($body)) {
          Send-Text $response 400 "Missing body"
          continue
        }

        $json = $body | ConvertFrom-Json
        $name = [string]$json.name
        $short = [string]$json.short
        $description = [string]$json.description
        $category = [string]$json.category
        $subcategory = [string]$json.subcategory
        $price = [double]$json.price
        $compareAt = $null
        if ($null -ne $json.compareAt) { $compareAt = [double]$json.compareAt } else { $compareAt = $price }
        $tags = @()
        if ($null -ne $json.tags) {
          $tags = @($json.tags | ForEach-Object { [string]$_ } )
        }

        if ([string]::IsNullOrWhiteSpace($name) -or [string]::IsNullOrWhiteSpace($short) -or [string]::IsNullOrWhiteSpace($description) -or [string]::IsNullOrWhiteSpace($category)) {
          Send-Text $response 400 "Missing required fields"
          continue
        }
        if ($price -lt 0) {
          Send-Text $response 400 "Invalid price"
          continue
        }

        $slug = $name.ToLowerInvariant().Trim()
        $slug = [System.Text.RegularExpressions.Regex]::Replace($slug, "[^a-z0-9]+", "-")
        $slug = [System.Text.RegularExpressions.Regex]::Replace($slug, "(^[-]+)|([-]+$)", "")
        if ([string]::IsNullOrWhiteSpace($slug)) { $slug = "product" }

        $id = "u-{0}-{1}" -f $slug, ([DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds())

        $product = @{
          id = $id
          name = $name
          short = $short
          description = $description
          price = $price
          compareAt = $compareAt
          category = $category
          subcategory = $subcategory
          strength = ""
          rating = 0
          reviewCount = 0
          tags = $tags
          reviews = @()
        }
        if ($null -ne $json.image -and -not [string]::IsNullOrWhiteSpace([string]$json.image)) {
          $product.image = [string]$json.image
        }
        if ($null -ne $json.videoUrl -and -not [string]::IsNullOrWhiteSpace([string]$json.videoUrl)) {
          $product.videoUrl = [string]$json.videoUrl
        }

        $store.userProducts = @($store.userProducts + @($product))

        Write-Store $store

        Send-Json $response 200 $product
        continue
      }

      if ($path -eq "/api/products/update" -and $request.HttpMethod -eq "POST") {
        if (-not (Require-Admin $request)) {
          Send-Text $response 401 "Unauthorized"
          continue
        }

        $reader = New-Object System.IO.StreamReader($request.InputStream)
        $body = $reader.ReadToEnd()
        if ([string]::IsNullOrWhiteSpace($body)) {
          Send-Text $response 400 "Missing body"
          continue
        }

        $json = $body | ConvertFrom-Json
        $id = [string]$json.id
        if ([string]::IsNullOrWhiteSpace($id)) {
          Send-Text $response 400 "Missing id"
          continue
        }

        $store = Read-Store
        $cur = $null
        foreach ($p in @($store.userProducts)) {
          if ([string]$p.id -eq $id) {
            $cur = $p
            break
          }
        }
        if ($null -eq $cur) {
          Send-Text $response 404 "Product not found"
          continue
        }

        $name = [string]$json.name
        $short = [string]$json.short
        $description = [string]$json.description
        $category = [string]$json.category
        $subcategory = if ($null -ne $json.subcategory) { [string]$json.subcategory } else { "" }
        $price = [double]$json.price
        $compareAt = $null
        if ($null -ne $json.compareAt) { $compareAt = [double]$json.compareAt } else { $compareAt = $price }
        $tags = @()
        if ($null -ne $json.tags) {
          $tags = @($json.tags | ForEach-Object { [string]$_ } )
        }

        if ([string]::IsNullOrWhiteSpace($name) -or [string]::IsNullOrWhiteSpace($short) -or [string]::IsNullOrWhiteSpace($description) -or [string]::IsNullOrWhiteSpace($category)) {
          Send-Text $response 400 "Missing required fields"
          continue
        }
        if ($price -lt 0) {
          Send-Text $response 400 "Invalid price"
          continue
        }

        $updated = @{
          id = $id
          name = $name
          short = $short
          description = $description
          price = $price
          compareAt = $compareAt
          category = $category
          subcategory = $subcategory
          strength = if ($null -ne $cur.strength) { [string]$cur.strength } else { "" }
          rating = if ($null -ne $cur.rating) { [double]$cur.rating } else { 0 }
          reviewCount = if ($null -ne $cur.reviewCount) { [int]$cur.reviewCount } else { 0 }
          tags = $tags
          reviews = @($cur.reviews)
        }
        $propNames = @($json.PSObject.Properties | ForEach-Object { $_.Name })
        if ($propNames -contains "image") {
          $im = [string]$json.image
          if (-not [string]::IsNullOrWhiteSpace($im)) {
            $updated.image = $im
          }
        }
        elseif ($null -ne $cur.image -and -not [string]::IsNullOrWhiteSpace([string]$cur.image)) {
          $updated.image = [string]$cur.image
        }
        if ($propNames -contains "videoUrl") {
          $vv = [string]$json.videoUrl
          if (-not [string]::IsNullOrWhiteSpace($vv)) {
            $updated.videoUrl = $vv
          }
        }
        elseif ($null -ne $cur.videoUrl -and -not [string]::IsNullOrWhiteSpace([string]$cur.videoUrl)) {
          $updated.videoUrl = [string]$cur.videoUrl
        }

        $out = @()
        foreach ($p in @($store.userProducts)) {
          if ([string]$p.id -eq $id) {
            $out += $updated
          }
          else {
            $out += $p
          }
        }
        $store.userProducts = $out
        Write-Store $store
        Send-Json $response 200 $updated
        continue
      }

      Send-Text $response 404 "Not found"
      continue
    }

    # ---- Static files ----
    # Short URLs (no .html) — many users type /admin and get 404 otherwise
    if ($path -eq "/admin") { $path = "/admin.html" }

    # React/Vite uses root index.html; :8080 is mainly API + legacy static pages.
    # Serve the old multi-page home so http://localhost:8080/ is usable without Vite.
    if ($path -eq "/" -or $path -eq "/index.html") {
      $legacyHome = Join-Path $Root "static-site-index.html"
      if (Test-Path $legacyHome) {
        $path = "/static-site-index.html"
      }
      else {
        $path = "/index.html"
      }
    }

    $filePath = Join-Path $Root ($path.TrimStart("/").Replace("/", "\"))
    if (!(Test-Path $filePath) -or (Test-Path $filePath -PathType Container)) {
      Send-Text $response 404 "File not found"
      continue
    }

    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $response.StatusCode = 200
    $response.ContentType = (Get-ContentType $filePath)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.OutputStream.Close()
  }
  catch {
    Send-Text $response 500 ("Server error: " + $_.Exception.Message)
  }
}

$listener.Stop()

