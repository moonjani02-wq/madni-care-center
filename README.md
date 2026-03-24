# E-commerce Website (Static Demo)

This is a **complete multi-page e-commerce website** built with **HTML + CSS + JavaScript** (no backend).
It includes a product catalog, product pages, cart, and a demo checkout flow.

## Pages

- `index.html`: Homepage (hero + featured products)
- `products.html`: Product listing page (search/filter/sort)
- `product.html`: Product detail page (images, description, reviews)
- `about.html`: About Us
- `contact.html`: Contact form (demo submit)
- `pricing.html`: Pricing control table (edit prices from your phone browser)
- `cart.html`: Cart (update quantity, remove items, totals)
- `checkout.html`: Checkout form (demo place order)
- `thankyou.html`: Order confirmation screen (demo)
- `add-product.html`: Simple form to add products (saved in localStorage)

## How to run

Open `index.html` in your browser.

For best results in VS Code/Cursor, use a simple local server (prevents some browser restrictions):

```bash
# If you have Node installed:
npx serve .
```

## Where to customize

Open `app.js` and update:

- `BUSINESS.name`: your business name
- `BUSINESS.tagline`: short tagline
- `BUSINESS.audience`: target audience text
- `PRODUCTS`: replace demo products with your real catalog (name, price, description, reviews)

## What the code does (simple explanation)

### Layout + design (`styles.css`)

- **Cover / banner photo**: in `:root`, set `--cover-image` (path), `--cover-position` (e.g. `center center`), and if the picture still looks cropped, try **`--cover-fit: contain`** (full image visible, possible side bands). Banner heights are in `styles.css` on `.page-cover` and `.hero-art`.
- Uses a **mobile-first responsive grid** for product cards and page layouts.
- Defines consistent design tokens (colors, spacing, radius) in `:root`.
- Includes reusable UI components: `card`, `btn`, `pill`, `badge`, `grid`, `two-col`.

### Product system + pages (`app.js`)

- `PRODUCTS`: the catalog (single source of truth)
- **Product images**: generated as SVG gradients (no external files required)
- **Cart**: stored in `localStorage` under `pangy_cart_v1`
- Page auto-inits based on `<body data-page="...">`:
  - `home`: renders featured products
  - `products`: renders listing + search/filter/sort
  - `product`: renders product detail + reviews from query param `?id=...`
  - `cart`: renders cart table + totals
  - `checkout`: renders checkout form + order summary; on submit clears cart and redirects
  - `contact`: handles demo form submit and shows a toast

### Checkout (demo)

The checkout is intentionally basic:

- Validates required fields in the browser.
- Does **not** take payment.
- Clears the cart and redirects to `thankyou.html`.

### Pricing control (demo)

- Open `pricing.html` on the phone/browser where you want to edit prices.
- Changes are stored in `localStorage` for that browser/device.
- For shared pricing across all devices, you’ll need a backend or admin panel.

## Next upgrades (optional)

- Connect Stripe/PayPal
- Add real product photos (`/assets/`)
- Add admin product management + inventory
- Order confirmation emails + database

## Backend admin (PowerShell)

If you want pricing control and product adding to work across devices, run the local backend server and use `admin.html`.

1. Run PowerShell in this folder (`c:\Users\HP\Desktop\pangy`)
2. Start the server:

```powershell
.\server.ps1 -Port 8080 -AdminPassword "yourPassword"
```

3. Open the admin page:
   - `http://localhost:8080/admin.html`
4. Open the shop normally (prices/products will be loaded from the backend automatically):
   - `http://localhost:8080/index.html`


