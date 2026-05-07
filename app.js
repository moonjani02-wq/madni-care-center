/* Madni Care — static shop: catalog, cart, pricing overrides, user-added products */
(function () {
  const BUSINESS = {
    name: "Madni Care Center",
    tagline: "Modern wellness products crafted with care.",
    audience: "Men & Women • Age 18+",
  };

  const BASE_PRODUCTS = [
    {
      id: "majoon-classic",
      name: "Majoon Classic",
      short: "Traditional herbal blend for daily vitality.",
      description:
        "Our classic Majoon is a balanced herbal formula designed for everyday wellness. Crafted with quality ingredients, small-batch prepared, and packaged fresh.",
      price: 5600,
      compareAt: 7000,
      category: "Herbal",
      subcategory: "Majoon",
      strength: "Daily",
      rating: 4.7,
      reviewCount: 132,
      tags: ["Bestseller", "No preservatives"],
      reviews: [
        { name: "Ayesha", stars: 5, text: "Clean taste and easy on the stomach. Felt better within a week." },
        { name: "Bilal", stars: 4, text: "Good quality. Packaging was solid. Will reorder." },
        { name: "Sana", stars: 5, text: "Consistent results and nice customer support." },
      ],
    },
    {
      id: "majoon-premium",
      name: "Majoon Premium",
      short: "Upgraded blend with added adaptogens.",
      description:
        "Premium Majoon includes carefully selected herbs with adaptogenic support. Designed for busy schedules and sustained energy throughout the day.",
      price: 8400,
      compareAt: 9800,
      category: "Herbal",
      subcategory: "Majoon",
      strength: "Active",
      rating: 4.8,
      reviewCount: 88,
      tags: ["New", "Lab-tested"],
      reviews: [
        { name: "Hassan", stars: 5, text: "goe hafiz g loha paar ki cheez hy ." },
        { name: "Maryam", stars: 5, text: "Smooth, premium feel. Worth it but expensive" },
        { name: "Omar", stars: 4, text: "Solid results, mgr delivery time is long but product achaa hy ." },
      ],
    },
    {
      id: "majoon-lite",
      name: "Majoon Lite",
      short: "Gentle blend for beginners.",
      description:
        "A lighter formula built for first-time users. Gentle, easy to integrate into your routine, and ideal for those who prefer mild support.",
      price: 4200,
      compareAt: 5320,
      category: "Herbal",
      subcategory: "Majoon",
      strength: "Gentle",
      rating: 4.5,
      reviewCount: 54,
      tags: ["Beginner-friendly", "Mild"],
      reviews: [
        { name: "Nida", stars: 5, text: "Perfect starter. No heaviness." },
        { name: "Saad", stars: 4, text: "Good mild formula. Will try Classic next." },
      ],
    },
    {
      id: "herbal-honey",
      name: "Herbal Honey Blend",
      short: "Raw honey infused with herbs.",
      description:
        "A smooth honey blend infused with herbal extracts. Enjoy as a spoonful or mix into warm water (avoid boiling water).",
      price: 3500,
      compareAt: 4200,
      category: "Honey",
      subcategory: "Honey",
      strength: "Daily",
      rating: 4.6,
      reviewCount: 61,
      tags: ["Raw", "No additives"],
      reviews: [
        { name: "Zara", stars: 5, text: "Tastes amazing and feels soothing." },
        { name: "Imran", stars: 4, text: "Great in warm water. Nice quality." },
      ],
    },
    {
      id: "wellness-tea",
      name: "Wellness Tea",
      short: "Herbal tea for calm evenings.",
      description:
        "A calming tea blend featuring aromatic herbs. Perfect for evenings or whenever you want a gentle wind-down routine.",
      price: 2800,
      compareAt: 3640,
      category: "Tea",
      subcategory: "Tea",
      strength: "Gentle",
      rating: 4.4,
      reviewCount: 39,
      tags: ["Caffeine-free", "Relaxing"],
      reviews: [
        { name: "Farah", stars: 5, text: "Lovely aroma. Helps me unwind." },
        { name: "Hamza", stars: 4, text: "Nice taste, good price." },
      ],
    },
    {
      id: "gift-box",
      name: "Wellness Gift Box",
      short: "Curated set for gifting.",
      description:
        "A curated gift set featuring customer favorites. Ideal for birthdays, holidays, or thoughtful gestures.",
      price: 10920,
      compareAt: 13720,
      category: "Bundles",
      subcategory: "Gift Sets",
      strength: "Assorted",
      rating: 4.9,
      reviewCount: 27,
      tags: ["Gift-ready", "Limited"],
      reviews: [
        { name: "Naveed", stars: 5, text: "Beautiful presentation. Great gift." },
        { name: "Hira", stars: 5, text: "My family loved it!" },
      ],
    },
    {
      id: "aswagandha-powder",
      name: "Aswagandha Powder",
      short: "Herbal powder for balanced daily support.",
      description:
        "Finely milled aswagandha powder sourced for quality. Mix into milk/smoothies or as advised on the label.",
      price: 2240,
      compareAt: 2800,
      category: "Herbal Items",
      subcategory: "Powders",
      strength: "Daily",
      rating: 4.6,
      reviewCount: 41,
      tags: ["Pansar store", "Fine powder"],
      reviews: [
        { name: "Rimsha", stars: 5, text: "Good quality powder. Fresh smell." },
        { name: "Usman", stars: 4, text: "Works well in warm milk." },
      ],
    },
    {
      id: "kalonji-seeds",
      name: "Kalonji (Black Seed)",
      short: "Premium whole black seeds.",
      description:
        "Whole black seeds (kalonji) in a clean pack. Commonly used in traditional routines — store cool and dry.",
      price: 1200,
      compareAt: 1500,
      category: "Herbal Items",
      subcategory: "Seeds",
      strength: "Daily",
      rating: 4.7,
      reviewCount: 45,
      tags: ["Whole", "Traditional"],
      reviews: [
        { name: "Ali", stars: 5, text: "Fresh pack, good aroma." },
        { name: "Sadia", stars: 4, text: "Value for money." },
      ],
    },
    {
      id: "senna-leaves",
      name: "Senna Leaves (Sana Makki)",
      short: "Dried senna leaves (herbal item).",
      description:
        "Dried senna leaves, packed clean. Use responsibly and follow label directions.",
      price: 1400,
      compareAt: 1680,
      category: "Herbal Items",
      subcategory: "Herbs",
      strength: "Active",
      rating: 4.4,
      reviewCount: 19,
      tags: ["Herbal item", "Packed clean"],
      reviews: [{ name: "Hina", stars: 4, text: "Clean leaves, arrived on time." }],
    },
    {
      id: "olive-oil",
      name: "Olive Oil (Cold Pressed)",
      short: "Cold pressed oil for daily use.",
      description:
        "Cold pressed olive oil. Suitable for cooking and everyday wellness routines. Store away from heat/light.",
      image: "/images/olive-oil.png",
      price: 3080,
      compareAt: 3640,
      category: "Oils",
      subcategory: "Oils",
      strength: "Daily",
      rating: 4.6,
      reviewCount: 22,
      tags: ["Cold pressed", "Pure"],
      reviews: [
        { name: "Adeel", stars: 5, text: "Nice taste and good quality." },
        { name: "Maham", stars: 4, text: "Good packaging." },
      ],
    },
    {
      id: "black-seed-oil",
      name: "Black Seed Oil",
      short: "Pure kalonji oil (cold pressed).",
      description:
        "Cold pressed black seed oil. Packed in a dark bottle to help preserve quality.",
      price: 3220,
      compareAt: 3920,
      category: "Oils",
      subcategory: "Oils",
      strength: "Active",
      rating: 4.7,
      reviewCount: 31,
      tags: ["Cold pressed", "Dark bottle"],
      reviews: [
        { name: "Raza", stars: 5, text: "Strong aroma, feels authentic." },
        { name: "Iqra", stars: 4, text: "Good oil, arrived sealed." },
      ],
    },
    {
      id: "ajwain",
      name: "Ajwain (Carom Seeds)",
      short: "Strong aromatic ajwain seeds.",
      description:
        "Fresh ajwain seeds, commonly used in meals and herbal mixes. Keep tightly sealed for aroma.",
      price: 910,
      compareAt: 1120,
      category: "Herbal Items",
      subcategory: "Seeds",
      strength: "Active",
      rating: 4.5,
      reviewCount: 24,
      tags: ["Aromatic", "Fresh"],
      reviews: [{ name: "Sohail", stars: 5, text: "Very aromatic. Good quality." }],
    },
    {
      id: "haldi-powder-pansar",
      name: "Haldi (Turmeric) Powder",
      short: "Clean ground turmeric for daily use.",
      description:
        "Finely ground haldi for cooking and traditional use. Store in an airtight jar away from moisture.",
      price: 480,
      compareAt: 620,
      category: "Pansar Store",
      subcategory: "Spices",
      strength: "Daily",
      rating: 4.6,
      reviewCount: 52,
      tags: ["Pansar", "Powder"],
      reviews: [
        { name: "Khalid", stars: 5, text: "Colour aur smell dono theek — pansar jaisi feel." },
        { name: "Saima", stars: 4, text: "Packaging achi thi, value okay." },
      ],
    },
    {
      id: "sonth-powder-pansar",
      name: "Sonth (Dry Ginger) Powder",
      short: "Aromatic dry ginger powder.",
      description:
        "Dry ginger (sonth) powder for warm drinks and cooking. Keep sealed to preserve aroma.",
      price: 520,
      compareAt: 650,
      category: "Pansar Store",
      subcategory: "Spices",
      strength: "Daily",
      rating: 4.5,
      reviewCount: 38,
      tags: ["Pansar", "Warmth"],
      reviews: [{ name: "Tariq", stars: 5, text: "Zaiqa saaf hai, ghar wale khush." }],
    },
    {
      id: "desi-gur-pansar",
      name: "Desi Jaggery (Gur)",
      short: "Traditional jaggery block / pieces.",
      description:
        "Natural-style gur for tea and traditional recipes. Break as needed; store cool and dry.",
      price: 380,
      compareAt: 480,
      category: "Pansar Store",
      subcategory: "Sweeteners",
      strength: "Daily",
      rating: 4.7,
      reviewCount: 44,
      tags: ["Pansar", "Natural"],
      reviews: [{ name: "Farzana", stars: 5, text: "Meetha balance acha — zyada artificial nahi." }],
    },
    {
      id: "mishri-rock-pansar",
      name: "Mishri (Rock Sugar)",
      short: "Crystal mishri for tea and mouth freshness.",
      description:
        "Clean mishri crystals. Popular for kadha-style drinks and light sweetness.",
      price: 290,
      compareAt: 380,
      category: "Pansar Store",
      subcategory: "Sweeteners",
      strength: "Gentle",
      rating: 4.4,
      reviewCount: 29,
      tags: ["Pansar", "Crystals"],
      reviews: [{ name: "Asim", stars: 4, text: "Choti packing convenient thi." }],
    },
    {
      id: "sauf-whole-pansar",
      name: "Saunf (Fennel) — Pansar Pack",
      short: "Whole fennel seeds, daily pack.",
      description:
        "Whole aromatic saunf for after-meals and home mixes. Same quality line as our herbal saunf listing.",
      price: 340,
      compareAt: 420,
      category: "Pansar Store",
      subcategory: "Seeds",
      strength: "Daily",
      rating: 4.6,
      reviewCount: 31,
      tags: ["Pansar", "Whole"],
      reviews: [{ name: "Nabeel", stars: 5, text: "Khushboo strong — pansar wali vibe." }],
    },
    {
      id: "namak-black-pansar",
      name: "Kala Namak (Black Salt)",
      short: "Powdered black salt for chaat & drinks.",
      description:
        "Finely ground kala namak for raita, fruit chaat, and jaljeera-style drinks.",
      price: 220,
      compareAt: 280,
      category: "Pansar Store",
      subcategory: "Spices",
      strength: "Daily",
      rating: 4.5,
      reviewCount: 27,
      tags: ["Pansar", "Powder"],
      reviews: [{ name: "Hira", stars: 4, text: "Thik thak — price ke hisaab se theek." }],
    },
  ];

  const USER_PRODUCTS_KEY = "pangy_user_products_v1";
  const PRICE_OVERRIDES_KEY = "pangy_price_overrides_v1";
  const DISPLAY_OVERRIDES_KEY = "pangy_display_overrides_v1";
  const CART_KEY = "pangy_cart_v1";
  const BASE_CATALOG_EDITS_KEY = "pangy_base_catalog_edits_v1";
  const OWNER_SESSION_KEY = "pangy_owner_session_v1";
  const OWNER_DEFAULT = { username: "owner", password: "Owner@123" };
  const FREE_SHIPPING_MIN_PKR = 11200;
  const SHIPPING_FLAT_PKR = 300;

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function saveJson(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function loadBaseCatalogEdits() {
    const o = loadJson(BASE_CATALOG_EDITS_KEY, {});
    return o && typeof o === "object" ? o : {};
  }

  function saveBaseCatalogEdits(obj) {
    saveJson(BASE_CATALOG_EDITS_KEY, obj && typeof obj === "object" ? obj : {});
  }

  /** Merge localStorage catalog edits onto one built-in (code) product. */
  function applyBaseCatalogEdit(p) {
    const edits = loadBaseCatalogEdits();
    const e = edits[p.id];
    if (!e || typeof e !== "object") return { ...p, reviews: [...(p.reviews || [])], tags: [...(p.tags || [])] };
    const out = {
      ...p,
      name: typeof e.name === "string" && e.name.trim() ? e.name.trim() : p.name,
      short: typeof e.short === "string" ? e.short : p.short,
      description: typeof e.description === "string" ? e.description : p.description,
      category: typeof e.category === "string" && e.category.trim() ? e.category.trim() : p.category,
      subcategory: typeof e.subcategory === "string" ? e.subcategory : p.subcategory,
      strength: typeof e.strength === "string" ? e.strength : p.strength,
      image: typeof e.image === "string" ? e.image : p.image,
    };
    const pr = Number(e.price);
    const cmp = Number(e.compareAt);
    const rt = Number(e.rating);
    const rc = Number(e.reviewCount);
    if (Number.isFinite(pr) && pr >= 0) out.price = pr;
    if (Number.isFinite(cmp) && cmp >= 0) out.compareAt = cmp;
    if (Number.isFinite(rt)) out.rating = rt;
    if (Number.isFinite(rc) && rc >= 0) out.reviewCount = rc;
    out.tags = Array.isArray(e.tags) ? e.tags.filter((t) => typeof t === "string") : p.tags || [];
    out.reviews = Array.isArray(e.reviews)
      ? e.reviews.filter((r) => r && typeof r === "object")
      : [...(p.reviews || [])];
    return out;
  }

  function getBaseCatalogMergedList() {
    return BASE_PRODUCTS.map((p) => applyBaseCatalogEdit({ ...p }));
  }

  function loadUserProducts() {
    const parsed = loadJson(USER_PRODUCTS_KEY, []);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((p) => p && typeof p === "object" && typeof p.id === "string" && typeof p.name === "string")
      .map((p) => ({
        id: p.id,
        name: p.name,
        short: typeof p.short === "string" ? p.short : "",
        description: typeof p.description === "string" ? p.description : "",
        price: Number(p.price),
        compareAt: typeof p.compareAt === "number" ? p.compareAt : Number(p.price),
        category: typeof p.category === "string" ? p.category : "General",
        subcategory: typeof p.subcategory === "string" ? p.subcategory : "",
        strength: typeof p.strength === "string" ? p.strength : "",
        rating: typeof p.rating === "number" ? p.rating : 0,
        reviewCount: typeof p.reviewCount === "number" ? p.reviewCount : 0,
        tags: Array.isArray(p.tags) ? p.tags : [],
        reviews: Array.isArray(p.reviews) ? p.reviews : [],
        image: typeof p.image === "string" ? p.image : "",
      }));
  }

  function loadPriceOverrides() {
    const o = loadJson(PRICE_OVERRIDES_KEY, {});
    return o && typeof o === "object" ? o : {};
  }

  function loadDisplayOverrides() {
    const o = loadJson(DISPLAY_OVERRIDES_KEY, {});
    return o && typeof o === "object" ? o : {};
  }

  function mergeOneProduct(base, priceOv, dispOv) {
    const d = dispOv[base.id];
    const o = priceOv[base.id];
    const price = Number(o && o.price !== undefined ? o.price : base.price);
    const compareRaw = o && o.compareAt !== undefined ? o.compareAt : base.compareAt;
    const compareAt = Number(typeof compareRaw === "number" ? compareRaw : price);
    return {
      ...base,
      name: d && d.name ? d.name : base.name,
      short: d && d.short !== undefined ? d.short : base.short,
      image: d && d.image !== undefined ? d.image : base.image,
      price,
      compareAt,
    };
  }

  function getProducts() {
    const priceOv = loadPriceOverrides();
    const dispOv = loadDisplayOverrides();
    const byId = new Map();
    for (const p of BASE_PRODUCTS) {
      const merged = applyBaseCatalogEdit({ ...p });
      byId.set(p.id, mergeOneProduct(merged, priceOv, dispOv));
    }
    for (const p of loadUserProducts()) {
      byId.set(p.id, mergeOneProduct({ ...p, reviews: p.reviews || [], tags: p.tags || [] }, priceOv, dispOv));
    }
    return Array.from(byId.values());
  }

  function findProduct(id) {
    return getProducts().find((p) => p.id === id) || null;
  }

  function money(n) {
    return Number(n).toLocaleString("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function gradientForId(id) {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
    const h1 = h % 80 + 140;
    const h2 = (h >> 8) % 60 + 200;
    return { h1, h2 };
  }

  function productImgHtml(p) {
    if (p.image && String(p.image).trim()) {
      return `<div class="img"><img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" /></div>`;
    }
    const { h1, h2 } = gradientForId(p.id);
    return `<div class="img" style="background:linear-gradient(135deg,hsl(${h1},42%,38%),hsl(${h2},32%,24%))" role="img" aria-label=""></div>`;
  }

  function featuredScore(p) {
    const tagBonus = (p.tags || []).some((t) => /bestseller|gift|new/i.test(t)) ? 500 : 0;
    return tagBonus + (p.rating || 0) * 80 + (p.reviewCount || 0);
  }

  function productCard(p, opts) {
    const shop = opts && opts.shop;
    const topseller = opts && opts.topseller;
    const pansar = opts && opts.pansar;
    let cls = "col-6 col-lg-4";
    if (shop) cls = "shop-card";
    else if (topseller) cls = "topseller-card";
    else if (pansar) cls = "pansar-card";
    const href = (opts && opts.href) || `product.html?id=${encodeURIComponent(p.id)}`;
    const price = p.price;
    const compare = p.compareAt > p.price ? p.compareAt : null;
    const strike = compare ? `<span class="muted" style="text-decoration:line-through">${money(compare)}</span>` : "";
    return `<a class="card product ${cls}" href="${href}">${productImgHtml(p)}<div class="pad" style="padding-top:12px;"><div class="product-title">${escapeHtml(p.name)}</div><div class="tiny muted">${escapeHtml(p.short)}</div><div class="row" style="margin-top:8px;"><strong>${money(price)}</strong><div class="spacer"></div>${strike}</div></div></a>`;
  }

  function loadCartLines() {
    const raw = loadJson(CART_KEY, []);
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((l) => l && typeof l.productId === "string" && typeof l.qty === "number" && l.qty > 0)
      .map((l) => ({ productId: l.productId, qty: l.qty }));
  }

  function saveCartLines(lines) {
    saveJson(CART_KEY, lines);
  }

  function cartCount() {
    return loadCartLines().reduce((s, l) => s + l.qty, 0);
  }

  function updateCartBadge() {
    const n = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(n);
    });
  }

  function addToCart(productId, qty) {
    const q = Math.max(1, Number(qty) || 1);
    const lines = loadCartLines();
    const i = lines.findIndex((l) => l.productId === productId);
    if (i >= 0) lines[i].qty += q;
    else lines.push({ productId, qty: q });
    saveCartLines(lines);
    updateCartBadge();
  }

  function setLineQty(productId, qty) {
    const lines = loadCartLines().filter((l) => l.productId !== productId);
    const q = Math.max(0, Math.floor(Number(qty) || 0));
    if (q > 0) lines.push({ productId, qty: q });
    saveCartLines(lines);
    updateCartBadge();
  }

  function removeLine(productId) {
    saveCartLines(loadCartLines().filter((l) => l.productId !== productId));
    updateCartBadge();
  }

  function clearCart() {
    saveCartLines([]);
    updateCartBadge();
  }

  function removeUserProduct(productId) {
    const list = loadUserProducts().filter((p) => p.id !== productId);
    saveJson(USER_PRODUCTS_KEY, list);
    const po = loadPriceOverrides();
    if (po[productId]) {
      delete po[productId];
      saveJson(PRICE_OVERRIDES_KEY, po);
    }
    const d = loadDisplayOverrides();
    if (d[productId]) {
      delete d[productId];
      saveJson(DISPLAY_OVERRIDES_KEY, d);
    }
    removeLine(productId);
  }

  function applyBusiness() {
    document.querySelectorAll("[data-biz-name]").forEach((el) => {
      el.textContent = BUSINESS.name;
    });
    document.querySelectorAll("[data-biz-tagline]").forEach((el) => {
      el.textContent = BUSINESS.tagline;
    });
    document.querySelectorAll("[data-biz-audience]").forEach((el) => {
      el.textContent = BUSINESS.audience;
    });
  }

  function applyNav() {
    const path = (location.pathname.split("/").pop() || "").toLowerCase();
    const page =
      path === "" || path === "index.html"
        ? "home"
        : path.replace(".html", "").replace(/[^a-z-]/g, "") || "home";
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const key = a.getAttribute("data-nav");
      if (!key) return;
      const isHome = page === "home" || path === "";
      const isActive =
        (key === "home" && isHome) ||
        (key !== "home" && path === `${key}.html`) ||
        (key === "products" && path === "product.html");
      a.classList.toggle("is-active", !!isActive);
    });
  }

  function showToast(msg) {
    const root = document.getElementById("toast");
    const t = root && root.querySelector("[data-toast-text]");
    if (t) t.textContent = msg;
    if (root) {
      root.classList.add("show");
      clearTimeout(showToast._timer);
      showToast._timer = setTimeout(() => root.classList.remove("show"), 2400);
    }
  }

  function loadOwnerSession() {
    try {
      const raw = localStorage.getItem(OWNER_SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || typeof s !== "object") return null;
      if (typeof s.username !== "string" || s.username !== OWNER_DEFAULT.username) return null;
      if (typeof s.loggedInAt !== "number") return null;
      return { username: s.username, loggedInAt: s.loggedInAt };
    } catch {
      return null;
    }
  }

  function isOwnerLoggedIn() {
    return !!loadOwnerSession();
  }

  function ownerLogout() {
    try {
      localStorage.removeItem(OWNER_SESSION_KEY);
    } catch {}
    showToast("Logged out");
  }

  function ensureOwnerLogoutButton() {
    const nav = document.querySelector(".nav-links");
    if (!nav) return;
    let btn = nav.querySelector("[data-owner-logout]");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pill";
      btn.setAttribute("data-owner-logout", "1");
      btn.style.cursor = "pointer";
      btn.textContent = "Logout";
      btn.addEventListener("click", () => {
        ownerLogout();
        location.reload();
      });
      nav.appendChild(btn);
    }
  }

  function renderOwnerLogin(targetMount) {
    const mount = targetMount || document.querySelector("main") || document.body;
    mount.innerHTML = `
      <div class="card pad" style="max-width:560px;margin:0 auto;">
        <div class="row" style="margin-bottom:0;">
          <h1 style="margin:0;letter-spacing:-0.4px;">Owner login</h1>
          <div class="spacer"></div>
          <a class="btn small" href="index.html">Home</a>
        </div>
        <p class="subhead" style="margin:6px 0 12px;">Admin pages sirf owner ke liye hain.</p>
        <div class="divider"></div>
        <form id="ownerLoginForm" class="stack" style="gap:8px;max-width:420px;">
          <div class="field">
            <label>Username</label>
            <input class="input" id="ownerUser" value="${OWNER_DEFAULT.username}" autocomplete="username" />
          </div>
          <div class="field">
            <label>Password</label>
            <input class="input" id="ownerPass" type="password" autocomplete="current-password" placeholder="Enter password" />
            <div class="tiny" id="ownerLoginErr" style="color:var(--danger);"></div>
          </div>
          <div class="row">
            <button class="btn primary" type="submit">Login</button>
          </div>
          <p class="tiny muted" style="margin:0;">Default: <code>owner</code> / <code>Owner@123</code></p>
        </form>
      </div>
    `;

    const form = document.getElementById("ownerLoginForm");
    const u = document.getElementById("ownerUser");
    const p = document.getElementById("ownerPass");
    const err = document.getElementById("ownerLoginErr");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!u || !p || !err) return;
      const user = String(u.value || "").trim();
      const pass = String(p.value || "");
      if (user !== OWNER_DEFAULT.username || pass !== OWNER_DEFAULT.password) {
        err.textContent = "Wrong username or password.";
        return;
      }
      try {
        localStorage.setItem(
          OWNER_SESSION_KEY,
          JSON.stringify({ username: OWNER_DEFAULT.username, loggedInAt: Date.now() }),
        );
      } catch {}
      location.reload();
    });
  }

  function requireOwner(opts) {
    const o = opts && typeof opts === "object" ? opts : {};
    const mount = o.mountId ? document.getElementById(o.mountId) : null;
    if (isOwnerLoggedIn()) {
      ensureOwnerLogoutButton();
      return true;
    }
    renderOwnerLogin(mount);
    return false;
  }

  function starsHtml(n) {
    const full = Math.round(Number(n) || 0);
    let s = "";
    for (let i = 1; i <= 5; i++) s += `<span aria-hidden="true">${i <= full ? "★" : "☆"}</span>`;
    return `<span class="stars" aria-label="${full} out of 5">${s}</span>`;
  }

  function initHome() {
    const products = getProducts();
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort();
    const tiles = document.getElementById("categoryTiles");
    if (tiles) {
      tiles.innerHTML = cats
        .map(
          (c) =>
            `<a class="tile card pad" href="products.html?category=${encodeURIComponent(c)}"><strong>${escapeHtml(c)}</strong><div class="tiny muted">Browse</div></a>`,
        )
        .join("");
    }

    const feat = [...products].sort((a, b) => featuredScore(b) - featuredScore(a)).slice(0, 6);
    const fg = document.getElementById("featuredGrid");
    if (fg) fg.innerHTML = feat.map((p) => productCard(p, { topseller: true })).join("");

    const pansar = products.filter((p) => p.category === "Pansar Store").slice(0, 6);
    const pg = document.getElementById("pansarGrid");
    if (pg) pg.innerHTML = pansar.map((p) => productCard(p, { pansar: true })).join("");

    const pgPosts = document.getElementById("postsGrid");
    if (pgPosts) {
      pgPosts.innerHTML = [1, 2, 3]
        .map(
          (i) =>
            `<div class="card pad col-12 col-md-4"><div class="tiny muted">Blog</div><h3 style="margin:4px 0;">Wellness tip #${i}</h3><p class="muted" style="margin:0;font-size:14px;">Demo post — replace with your article.</p></div>`,
        )
        .join("");
    }

    const testimonials = document.getElementById("testimonials");
    if (testimonials) {
      const rows = [];
      for (const p of products) {
        for (const r of p.reviews || []) {
          rows.push({ p, r });
          if (rows.length >= 8) break;
        }
        if (rows.length >= 8) break;
      }
      testimonials.innerHTML = rows
        .slice(0, 6)
        .map(
          ({ p, r }) =>
            `<div class="note"><div class="row"><strong>${escapeHtml(r.name)}</strong><div class="spacer"></div>${starsHtml(r.stars)}</div><div class="tiny muted" style="margin:4px 0 0;">${escapeHtml(p.name)}</div><div style="margin-top:6px;">${escapeHtml(r.text)}</div></div>`,
        )
        .join("");
    }

    document.getElementById("quizBtn")?.addEventListener("click", () =>
      showToast("Quiz (demo): Try Majoon Classic for daily support."),
    );
    document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thanks — newsletter is a demo.");
      e.target.reset();
    });
  }

  function initProducts() {
    const products = getProducts();
    const qs = new URLSearchParams(location.search);
    const startCat = qs.get("category") || "";

    const catSel = document.getElementById("category");
    const subSel = document.getElementById("subcategory");
    const searchEl = document.getElementById("search");
    const sortEl = document.getElementById("sort");
    const grid = document.getElementById("productsGrid");
    const countEl = document.getElementById("resultsCount");

    const cats = ["All", ...Array.from(new Set(products.map((p) => p.category))).sort()];
    if (catSel) {
      catSel.innerHTML = cats.map((c) => `<option>${escapeHtml(c)}</option>`).join("");
      if (startCat && cats.includes(startCat)) catSel.value = startCat;
    }

    function subsFor(cat) {
      if (!cat || cat === "All") return ["All"];
      const set = new Set();
      for (const p of products) if (p.category === cat && p.subcategory) set.add(p.subcategory);
      return ["All", ...Array.from(set).sort()];
    }

    function refreshSubcat() {
      if (!subSel) return;
      const cat = catSel ? catSel.value : "All";
      const opts = subsFor(cat);
      subSel.innerHTML = opts.map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join("");
      subSel.disabled = cat === "All";
    }

    function filterList() {
      const q = (searchEl && searchEl.value ? searchEl.value : "").trim().toLowerCase();
      const cat = catSel ? catSel.value : "All";
      const sub = subSel && !subSel.disabled ? subSel.value : "All";
      let list = products.filter((p) => {
        if (cat !== "All" && p.category !== cat) return false;
        if (sub !== "All" && (p.subcategory || "") !== sub) return false;
        if (!q) return true;
        const blob = `${p.name} ${p.short} ${p.category} ${p.subcategory} ${(p.tags || []).join(" ")}`.toLowerCase();
        return blob.includes(q);
      });
      const sort = sortEl ? sortEl.value : "featured";
      if (sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      else if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
      else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
      else list.sort((a, b) => featuredScore(b) - featuredScore(a));
      if (grid) grid.innerHTML = list.map((p) => productCard(p, { shop: true })).join("");
      if (countEl) countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    }

    refreshSubcat();
    filterList();
    catSel?.addEventListener("change", () => {
      refreshSubcat();
      filterList();
    });
    subSel?.addEventListener("change", filterList);
    searchEl?.addEventListener("input", filterList);
    sortEl?.addEventListener("change", filterList);
  }

  function initProduct() {
    const id = new URLSearchParams(location.search).get("id");
    const mount = document.getElementById("productMount");
    const more = document.getElementById("moreGrid");
    if (!id || !mount) return;
    const p = findProduct(id);
    if (!p) {
      mount.innerHTML = `<div class="card pad"><p>Product not found.</p><a class="btn" href="products.html">Back to shop</a></div>`;
      return;
    }
    const isUser = id.startsWith("u-");
    const reviews = (p.reviews || [])
      .map(
        (r) =>
          `<div class="card pad" style="margin-top:8px;"><div class="row"><strong>${escapeHtml(r.name)}</strong><div class="spacer"></div>${starsHtml(r.stars)}</div><p style="margin:8px 0 0;">${escapeHtml(r.text)}</p></div>`,
      )
      .join("");
    mount.innerHTML = `
      <div class="two-col" style="align-items:start;">
        <div>${productImgHtml(p).replace('class="img"', 'class="img" style="border-radius:12px;"')}</div>
        <div class="stack" style="gap:8px;">
          <div class="pill">${escapeHtml(p.category)}${p.subcategory ? " · " + escapeHtml(p.subcategory) : ""}</div>
          <h1 style="margin:0;letter-spacing:-0.4px;">${escapeHtml(p.name)}</h1>
          <p class="subhead" style="margin:0;">${escapeHtml(p.short)}</p>
          <div class="row">${starsHtml(p.rating)}<span class="muted tiny">${Number(p.reviewCount || 0)} reviews</span></div>
          <div class="row" style="align-items:baseline;">
            <span style="font-size:22px;font-weight:900;">${money(p.price)}</span>
            ${p.compareAt > p.price ? `<span class="muted" style="text-decoration:line-through">${money(p.compareAt)}</span>` : ""}
          </div>
          <p class="muted" style="margin:0;">${escapeHtml(p.description)}</p>
          <div class="row" style="gap:4px;flex-wrap:wrap;">
            <label class="field" style="margin:0;">Qty
              <input class="input" type="number" id="pqty" min="1" value="1" style="width:88px;" />
            </label>
            <button class="btn primary" type="button" id="padd">Add to cart</button>
            <a class="btn" href="cart.html">View cart</a>
          </div>
          ${isUser ? `<button class="btn" type="button" id="pdel" style="border-color:var(--danger);color:var(--danger);">Remove from shop</button>` : `<a class="btn small" href="add-product.html">Add your product</a>`}
        </div>
      </div>
      <div style="height:18px"></div>
      <h2 style="margin:0 0 8px;">Reviews</h2>
      ${reviews || '<p class="muted">No reviews yet.</p>'}
    `;
    document.getElementById("padd")?.addEventListener("click", () => {
      const q = Number(document.getElementById("pqty")?.value || 1);
      addToCart(p.id, q);
      showToast("Added to cart");
    });
    document.getElementById("pdel")?.addEventListener("click", () => {
      if (confirm("Remove this product from this browser?")) {
        removeUserProduct(p.id);
        location.href = "products.html";
      }
    });

    const others = getProducts().filter((x) => x.id !== p.id && x.category === p.category).slice(0, 4);
    if (!others.length) {
      const alt = getProducts().filter((x) => x.id !== p.id).slice(0, 4);
      if (more) more.innerHTML = alt.map((x) => productCard(x, {})).join("");
    } else if (more) more.innerHTML = others.map((x) => productCard(x, {})).join("");
  }

  function initCart() {
    const mount = document.getElementById("cartMount");
    if (!mount) return;
    const lines = loadCartLines();
    const products = getProducts();
    if (!lines.length) {
      mount.innerHTML =
        '<div class="card pad"><p>Your cart is empty.</p><a class="btn primary" href="products.html">Shop</a></div>';
      return;
    }
    const rows = [];
    let sub = 0;
    for (const l of lines) {
      const p = products.find((x) => x.id === l.productId);
      if (!p) continue;
      const lineTotal = p.price * l.qty;
      sub += lineTotal;
      rows.push(`
        <tr data-pid="${escapeAttr(p.id)}">
          <td>
            <div class="row" style="align-items:flex-start;gap:8px;">
              <div style="width:72px;border-radius:8px;overflow:hidden;flex-shrink:0;">${productImgHtml(p).replace("<div ", "<div style=\"max-width:72px\" ")}</div>
              <div>
                <a href="product.html?id=${encodeURIComponent(p.id)}" style="font-weight:800;">${escapeHtml(p.name)}</a>
                <div class="tiny muted">${money(p.price)} each</div>
              </div>
            </div>
          </td>
          <td class="right">
            <input class="input qty-input" type="number" min="1" step="1" value="${l.qty}" style="width:72px;text-align:right;" data-pid="${escapeAttr(p.id)}" />
          </td>
          <td class="right"><strong>${money(lineTotal)}</strong></td>
          <td class="right"><button type="button" class="btn small rm" data-pid="${escapeAttr(p.id)}">Remove</button></td>
        </tr>`);
    }
    const ship = sub >= FREE_SHIPPING_MIN_PKR ? 0 : SHIPPING_FLAT_PKR;
    const total = sub + ship;
    mount.innerHTML = `
      <div class="card pad">
        <div style="overflow:auto;">
          <table class="table" style="min-width:520px;width:100%;">
            <thead><tr><th>Item</th><th class="right">Qty</th><th class="right">Line</th><th></th></tr></thead>
            <tbody>${rows.join("")}</tbody>
          </table>
        </div>
        <div class="divider"></div>
        <div class="row" style="justify-content:flex-end;">
          <div class="stack" style="gap:4px;text-align:right;width:min(360px,100%);">
            <div class="row"><span class="muted">Subtotal</span><div class="spacer"></div><strong>${money(sub)}</strong></div>
            <div class="row"><span class="muted">Shipping</span><div class="spacer"></div><span>${ship === 0 ? "Free" : money(ship)}</span></div>
            <div class="tiny muted" style="text-align:right;">Free shipping on orders over ${money(FREE_SHIPPING_MIN_PKR)}</div>
            <div class="row" style="font-size:18px;"><span>Total</span><div class="spacer"></div><strong>${money(total)}</strong></div>
          </div>
        </div>
        <div class="row" style="margin-top:12px;">
          <a class="btn primary" href="checkout.html">Checkout</a>
          <a class="btn" href="products.html">Continue shopping</a>
        </div>
      </div>`;
    mount.querySelectorAll(".qty-input").forEach((inp) => {
      inp.addEventListener("change", () => {
        setLineQty(inp.getAttribute("data-pid"), inp.value);
        initCart();
      });
    });
    mount.querySelectorAll(".rm").forEach((btn) => {
      btn.addEventListener("click", () => {
        removeLine(btn.getAttribute("data-pid"));
        initCart();
      });
    });
  }

  function initCheckout() {
    const mount = document.getElementById("checkoutMount");
    if (!mount) return;
    const lines = loadCartLines();
    const products = getProducts();
    if (!lines.length) {
      mount.innerHTML =
        '<div class="card pad"><p>Cart is empty.</p><a class="btn" href="products.html">Shop</a></div>';
      return;
    }
    let sub = 0;
    const summary = [];
    for (const l of lines) {
      const p = products.find((x) => x.id === l.productId);
      if (!p) continue;
      sub += p.price * l.qty;
      summary.push(`<div class="row"><span>${escapeHtml(p.name)} × ${l.qty}</span><div class="spacer"></div><span>${money(p.price * l.qty)}</span></div>`);
    }
    const ship = sub >= FREE_SHIPPING_MIN_PKR ? 0 : SHIPPING_FLAT_PKR;
    const total = sub + ship;
    mount.innerHTML = `
      <div class="two-col">
        <form class="card pad stack" id="coForm" style="gap:8px;">
          <h1 style="margin:0;">Checkout</h1>
          <div class="grid" style="gap:4px;">
            <div class="col-12 field"><label for="coName">Full name *</label><input class="input" id="coName" required /></div>
            <div class="col-12 field"><label for="coEmail">Email *</label><input class="input" id="coEmail" type="email" required /></div>
            <div class="col-12 field"><label for="coPhone">Phone *</label><input class="input" id="coPhone" required /></div>
            <div class="col-12 field"><label for="coAddr">Address *</label><textarea class="input" id="coAddr" rows="3" required></textarea></div>
            <div class="col-6 field"><label for="coCity">City *</label><input class="input" id="coCity" required /></div>
            <div class="col-6 field"><label for="coZip">Postal code</label><input class="input" id="coZip" /></div>
          </div>
          <button class="btn primary" type="submit">Place order (demo)</button>
        </form>
        <div class="card pad">
          <h2 style="margin:0 0 8px;">Order summary</h2>
          <div class="stack" style="gap:4px;">${summary.join("")}</div>
          <div class="divider"></div>
          <div class="row"><span>Subtotal</span><div class="spacer"></div><strong>${money(sub)}</strong></div>
          <div class="row"><span>Shipping</span><div class="spacer"></div><span>${ship === 0 ? "Free" : money(ship)}</span></div>
          <div class="row" style="font-size:18px;"><span>Total</span><div class="spacer"></div><strong>${money(total)}</strong></div>
        </div>
      </div>`;
    document.getElementById("coForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      clearCart();
      location.href = "thankyou.html";
    });
  }

  function initPricing() {
    const mount = document.getElementById("pricingMount");
    if (!mount) return;
    if (!requireOwner({ mountId: "pricingMount" })) return;
    const products = getProducts();
    const rows = products
      .map((p) => {
        return `<tr>
          <td><div style="font-weight:800;">${escapeHtml(p.name)}</div><div class="tiny muted">${escapeHtml(p.short || "")}</div></td>
          <td>${escapeHtml(p.category || "")}</td>
          <td class="right"><input class="input" type="number" step="1" min="0" style="max-width:120px;text-align:right;" data-price="${escapeAttr(p.id)}" value="${p.price}" /></td>
          <td class="right"><input class="input" type="number" step="1" min="0" style="max-width:120px;text-align:right;" data-compare="${escapeAttr(p.id)}" value="${p.compareAt}" /></td>
        </tr>`;
      })
      .join("");
    mount.innerHTML = `
      <div class="row" style="margin-bottom:8px;">
        <h1 style="margin:0;">Pricing</h1>
        <div class="spacer"></div>
        <a class="btn small" href="admin.html">Admin</a>
      </div>
      <p class="subhead">Changes save in this browser only (${PRICE_OVERRIDES_KEY}).</p>
      <div class="card pad" style="overflow:auto;">
        <table class="table"><thead><tr><th>Product</th><th>Category</th><th class="right">Price (PKR)</th><th class="right">Compare</th></tr></thead><tbody>${rows}</tbody></table>
      </div>
      <div class="row" style="margin-top:8px;"><button class="btn primary" type="button" id="savePricingPage">Save</button></div>`;
    document.getElementById("savePricingPage")?.addEventListener("click", () => {
      const ov = loadPriceOverrides();
      mount.querySelectorAll("[data-price]").forEach((inp) => {
        const id = inp.getAttribute("data-price");
        const pr = Number(inp.value);
        const co = inp.closest("tr")?.querySelector("[data-compare]");
        const cmp = co ? Number(co.value) : pr;
        if (!id || !Number.isFinite(pr) || pr < 0) return;
        ov[id] = { price: pr, compareAt: Number.isFinite(cmp) ? cmp : pr };
      });
      saveJson(PRICE_OVERRIDES_KEY, ov);
      showToast("Pricing saved");
    });
  }

  function makeProductId(name) {
    const slug = String(name || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return "u-" + (slug || "product") + "-" + Date.now();
  }

  function initAddProduct() {
    const mount = document.getElementById("addProductMount");
    if (!mount) return;
    const userList = loadUserProducts();
    mount.innerHTML = `
      <h1 style="margin:0 0 8px;">Add product</h1>
      <p class="subhead">Saved in localStorage on this device (${USER_PRODUCTS_KEY}).</p>
      <form id="apForm" class="card pad stack" style="gap:8px;max-width:720px;">
        <div class="grid" style="gap:8px;">
          <div class="col-12 field"><label>Name *</label><input class="input" name="name" required /></div>
          <div class="col-12 field"><label>Short *</label><input class="input" name="short" required /></div>
          <div class="col-12 field"><label>Description *</label><textarea class="input" name="desc" rows="4" required></textarea></div>
          <div class="col-6 field"><label>Category *</label><input class="input" name="cat" required /></div>
          <div class="col-6 field"><label>Subcategory</label><input class="input" name="sub" /></div>
          <div class="col-6 field"><label>Price (PKR) *</label><input class="input" name="price" type="number" step="1" min="0" required /></div>
          <div class="col-6 field"><label>Compare at</label><input class="input" name="compare" type="number" step="1" min="0" /></div>
        </div>
        <button class="btn primary" type="submit">Save product</button>
      </form>
      <div class="card pad" style="margin-top:16px;">
        <h2 style="margin:0 0 8px;">Your products</h2>
        <div id="apList" class="stack"></div>
      </div>`;

    function renderUserList() {
      const box = document.getElementById("apList");
      if (!box) return;
      const list = loadUserProducts();
      if (!list.length) {
        box.innerHTML = '<p class="muted">None yet.</p>';
        return;
      }
      box.innerHTML = list
        .map(
          (p) =>
            `<div class="row note"><div><a href="product.html?id=${encodeURIComponent(p.id)}"><strong>${escapeHtml(p.name)}</strong></a></div><div class="spacer"></div><button type="button" class="btn small apr" data-id="${escapeAttr(p.id)}">Remove</button></div>`,
        )
        .join("");
      box.querySelectorAll(".apr").forEach((b) =>
        b.addEventListener("click", () => {
          removeUserProduct(b.getAttribute("data-id"));
          renderUserList();
        }),
      );
    }
    renderUserList();

    document.getElementById("apForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = String(fd.get("name") || "").trim();
      const price = Number(fd.get("price"));
      if (!name || !Number.isFinite(price) || price < 0) return;
      const np = {
        id: makeProductId(name),
        name,
        short: String(fd.get("short") || "").trim(),
        description: String(fd.get("desc") || "").trim(),
        category: String(fd.get("cat") || "").trim() || "General",
        subcategory: String(fd.get("sub") || "").trim(),
        price,
        compareAt: (() => {
          const c = Number(fd.get("compare"));
          return Number.isFinite(c) && c > 0 ? c : price;
        })(),
        strength: "",
        rating: 5,
        reviewCount: 0,
        tags: [],
        reviews: [],
        image: "",
      };
      const cur = loadUserProducts();
      cur.push(np);
      saveJson(USER_PRODUCTS_KEY, cur);
      e.target.reset();
      showToast("Product added");
      renderUserList();
    });
  }

  function initContact() {
    const form = document.getElementById("contactForm");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thanks — demo contact form.");
      form.reset();
    });
  }

  window.PANGY = {
    BASE_PRODUCTS,
    BUSINESS,
    getProducts,
    findProduct,
    money,
    loadUserProducts,
    loadBaseCatalogEdits,
    saveBaseCatalogEdits,
    applyBaseCatalogEdit,
    getBaseCatalogMergedList,
    BASE_CATALOG_EDITS_KEY,
    requireOwner,
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyBusiness();
    applyNav();
    updateCartBadge();
    const page = document.body.getAttribute("data-page") || "";
    switch (page) {
      case "home":
        initHome();
        break;
      case "products":
        initProducts();
        break;
      case "product":
        initProduct();
        break;
      case "cart":
        initCart();
        break;
      case "checkout":
        initCheckout();
        break;
      case "pricing":
        initPricing();
        break;
      case "add-product":
        initAddProduct();
        break;
      case "contact":
        initContact();
        break;
      default:
        break;
    }
  });
})();
