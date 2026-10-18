import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Icon } from "./Icon";

const mediaFiles: Record<string, string> = {
  "arc-mechanical-keyboard.png": new URL("../../media/media/arc-mechanical-keyboard.png", import.meta.url).href,
  "aster-bluetooth-earbuds.png": new URL("../../media/media/aster-bluetooth-earbuds.png", import.meta.url).href,
  "category-audio.png": new URL("../../media/media/category-audio.png", import.meta.url).href,
  "category-home.png": new URL("../../media/media/category-home.png", import.meta.url).href,
  "category-kitchen.png": new URL("../../media/media/category-kitchen.png", import.meta.url).href,
  "category-style.png": new URL("../../media/media/category-style.png", import.meta.url).href,
  "category-tech.png": new URL("../../media/media/category-tech.png", import.meta.url).href,
  "category-travel.png": new URL("../../media/media/category-travel.png", import.meta.url).href,
  "cloud-knit-throw.png": new URL("../../media/media/cloud-knit-throw.png", import.meta.url).href,
  "commuter-bottle-750ml.png": new URL("../../media/media/commuter-bottle-750ml.png", import.meta.url).href,
  "cove-compact-charger.png": new URL("../../media/media/cove-compact-charger.png", import.meta.url).href,
  "daybreak-polarized-shades.png": new URL("../../media/media/daybreak-polarized-shades.png", import.meta.url).href,
  "ember-bedside-light.png": new URL("../../media/ember-bedside-light.png", import.meta.url).href,
  "everyday-canvas-backpack.png": new URL("../../media/everyday-canvas-backpack.png", import.meta.url).href,
  "field-notes-collection.png": new URL("../../media/field-notes-collection.png", import.meta.url).href,
  "focus-portable-monitor.png": new URL("../../media/focus-portable-monitor.png", import.meta.url).href,
  "gather-linen-apron.png": new URL("../../media/gather-linen-apron.png", import.meta.url).href,
  "halo-ceramic-desk-lamp.png": new URL("../../media/halo-ceramic-desk-lamp.png", import.meta.url).href,
  "lava-home-hero.png": new URL("../../media/lava-home-hero.png", import.meta.url).href,
  "lumen-reading-glasses.png": new URL("../../media/lumen-reading-glasses.png", import.meta.url).href,
  "morrow-cotton-overshirt.png": new URL("../../media/morrow-cotton-overshirt.png", import.meta.url).href,
  "nomad-travel-organizer.png": new URL("../../media/nomad-travel-organizer.png", import.meta.url).href,
  "orbit-smart-speaker.png": new URL("../../media/orbit-smart-speaker.png", import.meta.url).href,
  "precision-coffee-grinder.png": new URL("../../media/precision-coffee-grinder.png", import.meta.url).href,
  "ridge-laptop-stand.png": new URL("../../media/ridge-laptop-stand.png", import.meta.url).href,
  "roam-weekday-tote.png": new URL("../../media/roam-weekday-tote.png", import.meta.url).href,
  "shopping-video.mp4": new URL("../../media/shopping-video.mp4", import.meta.url).href,
  "solis-table-clock.png": new URL("../../media/solis-table-clock.png", import.meta.url).href,
  "stillwater-reed-diffuser.png": new URL("../../media/stillwater-reed-diffuser.png", import.meta.url).href,
  "studio-wireless-headphones.png": new URL("../../media/studio-wireless-headphones.png", import.meta.url).href,
  "sunday-serving-bowl.png": new URL("../../media/sunday-serving-bowl.png", import.meta.url).href,
  "weekender-carry-on.png": new URL("../../media/weekender-carry-on.png", import.meta.url).href,
};
const mediaUrl = (filename: string) => mediaFiles[filename];
const productImageUrl = (name: string) => mediaUrl(`${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}.png`);

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  color: string;
  accent: string;
  badge: string;
};
type StoreScreen = "login" | "home" | "catalog" | "product" | "cart" | "checkout" | "confirmation" | "account" | "wishlist" | "admin";
type Order = { id: string; date: string; total: number; status: string; items: string[] };
type CheckoutAddress = { name: string; email: string; phone: string; address: string; city: string; postal: string };

const storeDemoCredentials = { email: "shopper@northstar.test", password: "ShopDemo2026!" };
const categories = ["All", "Audio", "Home", "Travel", "Tech", "Style", "Kitchen"];
const seedProducts: Product[] = [
  { id: 1, name: "Studio Wireless Headphones", category: "Audio", description: "Rich studio sound, adaptive noise control, and a full-day battery in a comfortable over-ear fit.", price: 129, oldPrice: 169, rating: 4.8, reviews: 284, stock: 18, color: "#ded3c4", accent: "#a48261", badge: "BESTSELLER" },
  { id: 2, name: "Everyday Canvas Backpack", category: "Travel", description: "A thoughtfully organized everyday pack with a padded laptop sleeve and water-resistant canvas.", price: 84, oldPrice: 110, rating: 4.7, reviews: 196, stock: 12, color: "#d6dfd1", accent: "#657c65", badge: "−24%" },
  { id: 3, name: "Halo Ceramic Desk Lamp", category: "Home", description: "Soft, warm light and a sculptural ceramic base bring a little calm to your workspace.", price: 72, oldPrice: 89, rating: 4.6, reviews: 143, stock: 8, color: "#f0d9c9", accent: "#ba8064", badge: "STAFF PICK" },
  { id: 4, name: "Field Notes Collection", category: "Style", description: "A set of three responsibly sourced notebooks with lay-flat binding and smooth, fountain-pen-friendly pages.", price: 18, oldPrice: 24, rating: 4.9, reviews: 412, stock: 42, color: "#d9d4e7", accent: "#7f719c", badge: "−25%" },
  { id: 5, name: "Orbit Smart Speaker", category: "Audio", description: "Room-filling sound, simple voice control, and a compact design made for any room.", price: 99, oldPrice: 129, rating: 4.5, reviews: 168, stock: 0, color: "#d8e0e5", accent: "#6f8a9d", badge: "SOLD OUT" },
  { id: 6, name: "Arc Mechanical Keyboard", category: "Tech", description: "Tactile low-profile switches, a durable aluminum frame, and a satisfying typing feel.", price: 119, oldPrice: 149, rating: 4.8, reviews: 231, stock: 15, color: "#d9d5ce", accent: "#77746b", badge: "TRENDING" },
  { id: 7, name: "Cloud Knit Throw", category: "Home", description: "A soft, breathable knit throw for quiet evenings and slow weekend mornings.", price: 58, oldPrice: 74, rating: 4.7, reviews: 87, stock: 21, color: "#e7d9d0", accent: "#b59882", badge: "NEW" },
  { id: 8, name: "Commuter Bottle 750ml", category: "Kitchen", description: "Double-wall insulated steel keeps your drink at the right temperature all day.", price: 32, oldPrice: 40, rating: 4.4, reviews: 109, stock: 31, color: "#d5e2de", accent: "#65857b", badge: "−20%" },
  { id: 9, name: "Weekender Carry-On", category: "Travel", description: "A cabin-ready weekender with smart pockets, durable zippers, and a luggage sleeve.", price: 145, oldPrice: 185, rating: 4.6, reviews: 74, stock: 7, color: "#e6d6c6", accent: "#a47b57", badge: "LIMITED" },
  { id: 10, name: "Lumen Reading Glasses", category: "Style", description: "Lightweight acetate frames with a clean silhouette and a comfortable all-day fit.", price: 46, oldPrice: 59, rating: 4.3, reviews: 63, stock: 19, color: "#e2d6d3", accent: "#9d7470", badge: "NEW" },
  { id: 11, name: "Precision Coffee Grinder", category: "Kitchen", description: "Consistent burr grinding with a simple dial for your favorite brew method.", price: 89, oldPrice: 115, rating: 4.8, reviews: 306, stock: 10, color: "#dfd9cd", accent: "#81745d", badge: "TOP RATED" },
  { id: 12, name: "Focus Portable Monitor", category: "Tech", description: "A crisp, lightweight second screen for focused work at home or on the move.", price: 179, oldPrice: 229, rating: 4.5, reviews: 92, stock: 5, color: "#d4dce5", accent: "#677f9a", badge: "−22%" },
  { id: 13, name: "Solis Table Clock", category: "Home", description: "A quiet, minimal desk clock with an easy-to-read face and a warm brushed finish.", price: 39, oldPrice: 52, rating: 4.6, reviews: 58, stock: 16, color: "#e8ddca", accent: "#a68a5c", badge: "NEW" },
  { id: 14, name: "Nomad Travel Organizer", category: "Travel", description: "Keep cables, cards, and everyday travel essentials neatly in one compact case.", price: 27, oldPrice: 36, rating: 4.5, reviews: 81, stock: 25, color: "#d4ddd3", accent: "#71836c", badge: "−25%" },
  { id: 15, name: "Morrow Cotton Overshirt", category: "Style", description: "A versatile cotton layer designed to work from weekday mornings to slow weekends.", price: 68, oldPrice: 92, rating: 4.7, reviews: 119, stock: 14, color: "#e2d8cc", accent: "#927b63", badge: "LAVA PICK" },
  { id: 16, name: "Aster Bluetooth Earbuds", category: "Audio", description: "Pocket-sized wireless audio with a secure fit, clear calls, and an all-day case.", price: 79, oldPrice: 99, rating: 4.4, reviews: 137, stock: 22, color: "#d9d8e4", accent: "#797894", badge: "−20%" },
  { id: 17, name: "Ridge Laptop Stand", category: "Tech", description: "An adjustable aluminum stand that helps create a more comfortable desk setup.", price: 54, oldPrice: 69, rating: 4.8, reviews: 203, stock: 11, color: "#dadbd7", accent: "#7d817b", badge: "TOP RATED" },
  { id: 18, name: "Sunday Serving Bowl", category: "Kitchen", description: "A hand-finished stoneware bowl for shared meals, fruit, and everyday table moments.", price: 42, oldPrice: 55, rating: 4.6, reviews: 72, stock: 17, color: "#ead8c7", accent: "#a98268", badge: "NEW" },
  { id: 19, name: "Stillwater Reed Diffuser", category: "Home", description: "A soft cedar and citrus scent in a refillable glass vessel for a calmer room.", price: 34, oldPrice: 44, rating: 4.3, reviews: 91, stock: 20, color: "#d8e1d7", accent: "#758b72", badge: "FRESH FIND" },
  { id: 20, name: "Daybreak Polarized Shades", category: "Style", description: "Lightweight polarized sunglasses with a timeless frame for bright days outside.", price: 57, oldPrice: 75, rating: 4.5, reviews: 104, stock: 13, color: "#e8d9c7", accent: "#9a7853", badge: "−24%" },
  { id: 21, name: "Cove Compact Charger", category: "Tech", description: "A travel-ready fast charger with foldable prongs and two convenient ports.", price: 29, oldPrice: 38, rating: 4.6, reviews: 177, stock: 34, color: "#dbe1e2", accent: "#71878d", badge: "BESTSELLER" },
  { id: 22, name: "Gather Linen Apron", category: "Kitchen", description: "A comfortable cross-back apron in breathable linen with generous utility pockets.", price: 49, oldPrice: 64, rating: 4.7, reviews: 61, stock: 9, color: "#e4d9ca", accent: "#9f876b", badge: "LAVA PICK" },
  { id: 23, name: "Roam Weekday Tote", category: "Travel", description: "A roomy recycled-canvas tote with an inner zip pocket and reinforced handles.", price: 44, oldPrice: 58, rating: 4.5, reviews: 132, stock: 0, color: "#d6ded7", accent: "#728373", badge: "SOLD OUT" },
  { id: 24, name: "Ember Bedside Light", category: "Home", description: "A gentle dimmable bedside light with a tactile control and a warm evening glow.", price: 63, oldPrice: 79, rating: 4.8, reviews: 149, stock: 6, color: "#ead9cb", accent: "#a7765b", badge: "NEW" },
];

const money = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
const orderSeed: Order[] = [
  { id: "LAVA-28417", date: "Oct 14, 2026", total: 161, status: "Delivered", items: ["Studio Wireless Headphones", "Field Notes Collection"] },
  { id: "LAVA-27106", date: "Sep 28, 2026", total: 84, status: "Shipped", items: ["Everyday Canvas Backpack"] },
];

export function EndToEndStore() {
  const [screen, setScreen] = useState<StoreScreen>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [products, setProducts] = useState(seedProducts);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState(orderSeed);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(250);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (!notice) return;
    const timeoutId = window.setTimeout(() => setNotice(""), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutTransitioning, setCheckoutTransitioning] = useState(false);
  const [checkoutAddress, setCheckoutAddress] = useState<CheckoutAddress>({ name: "", email: "", phone: "", address: "", city: "", postal: "" });
  const [orderNumber, setOrderNumber] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const cartItems = useMemo(() => products.filter((product) => cart[product.id]), [cart, products]);
  const cartCount = Object.values(cart).reduce((total, count) => total + count, 0);
  const subtotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0);
  const shippingCost = shippingMethod === "express" ? 16 : subtotal >= 100 ? 0 : 8;
  const discount = promoApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const total = Math.max(0, subtotal + shippingCost - discount);
  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch && product.price <= maxPrice && product.rating >= minRating && (!inStockOnly || product.stock > 0);
    });
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") result.sort((a, b) => b.id - a.id);
    return result;
  }, [activeCategory, inStockOnly, maxPrice, minRating, products, search, sort]);
  const pageSize = 8;
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const pageProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const homeProducts = products.filter((product) => product.stock > 0).slice(0, 4);
  const newArrivals = products.filter((product) => product.id >= 19 && product.stock > 0).sort((a, b) => b.id - a.id).slice(0, 4);

  const goTo = (next: StoreScreen) => {
    setScreen(next);
    setCartDrawerOpen(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const addToCart = (product: Product, count = 1) => {
    if (!product.stock) {
      setNotice(`${product.name} is currently out of stock.`);
      return;
    }
    setCart((current) => ({ ...current, [product.id]: Math.min((current[product.id] ?? 0) + count, product.stock) }));
    setNotice(`${product.name} added to your cart.`);
    setCartDrawerOpen(true);
  };
  const changeQuantity = (productId: number, change: number) => setCart((current) => {
    const product = products.find((entry) => entry.id === productId);
    const count = Math.min((current[productId] ?? 0) + change, product?.stock ?? 99);
    if (count <= 0) {
      const next = { ...current };
      delete next[productId];
      return next;
    }
    return { ...current, [productId]: count };
  });
  const removeFromCart = (productId: number) => setCart((current) => {
    const next = { ...current };
    delete next[productId];
    return next;
  });
  const toggleWishlist = (productId: number) => {
    const product = products.find((entry) => entry.id === productId);
    const isWished = wishlist.includes(productId);
    setWishlist(isWished ? wishlist.filter((id) => id !== productId) : [...wishlist, productId]);
    if (product) setNotice(isWished ? `${product.name} removed from your wishlist.` : `${product.name} saved to your wishlist.`);
  };
  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    goTo("product");
  };
  const resetFilters = () => {
    setActiveCategory("All");
    setSearch("");
    setMaxPrice(250);
    setMinRating(0);
    setInStockOnly(false);
    setSort("featured");
    setPage(1);
  };
  const updateAddress = (field: keyof CheckoutAddress, value: string) => setCheckoutAddress((current) => ({ ...current, [field]: value }));
  const placeOrder = () => {
    const id = `LAVA-${Date.now().toString().slice(-8)}`;
    setOrderNumber(id);
    setOrders((current) => [{ id, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), total, status: "Processing", items: cartItems.map((product) => `${product.name} × ${cart[product.id]}`) }, ...current]);
    setCart({});
    goTo("confirmation");
  };
  const submitCheckoutStep = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkoutTransitioning) return;
    setCheckoutTransitioning(true);
    window.setTimeout(() => {
      if (checkoutStep < 4) setCheckoutStep((step) => step + 1);
      else placeOrder();
      setCheckoutTransitioning(false);
    }, 900);
  };
  const addProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newProductName.trim();
    const price = Number(newProductPrice);
    if (!name || !Number.isFinite(price) || price <= 0) {
      setNotice("Enter a product name and a price above zero.");
      return;
    }
    if (editingProductId !== null) {
      setProducts((current) => current.map((product) => product.id === editingProductId ? { ...product, name, price, oldPrice: price, badge: "UPDATED" } : product));
      setNotice(`${name} updated.`);
    } else {
      const id = Math.max(0, ...products.map((product) => product.id)) + 1;
      setProducts((current) => [...current, { id, name, category: "Home", description: "A new Lava E-commerce demo listing.", price, oldPrice: price, rating: 4.5, reviews: 0, stock: 12, color: "#e4ddd2", accent: "#8c785e", badge: "NEW" }]);
      setNotice(`${name} added to the catalog.`);
    }
    setNewProductName("");
    setNewProductPrice("");
    setEditingProductId(null);
  };
  const editProduct = (product: Product) => {
    setEditingProductId(product.id);
    setNewProductName(product.name);
    setNewProductPrice(String(product.price));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const removeProduct = (product: Product) => {
    setProducts((current) => current.filter((entry) => entry.id !== product.id));
    setCart((current) => {
      const next = { ...current };
      delete next[product.id];
      return next;
    });
    setWishlist((current) => current.filter((id) => id !== product.id));
    setNotice(`${product.name} removed from the catalog.`);
  };
  const signOut = () => {
    setScreen("login");
    setEmail("");
    setPassword("");
    setLoginError("");
    setCart({});
    setCartDrawerOpen(false);
    setNotice("");
  };

  const productCard = (product: Product, compact = false) => <article className={`lava-product-card ${compact ? "is-compact" : ""}`} key={product.id}>
    <div className="lava-product-art" style={{ "--product-color": product.color, "--product-accent": product.accent } as React.CSSProperties}>
      <span className="lava-product-badge">{product.badge}</span>
      <button type="button" className={`lava-art-placeholder ${productImageUrl(product.name) ? "has-product-image" : ""}`} aria-label={`View ${product.name}`} onClick={() => openProduct(product)}>{productImageUrl(product.name) ? <img src={productImageUrl(product.name)} alt={product.name} loading="lazy" /> : <><span>{product.category.slice(0, 1)}</span><i>{product.category}</i></>}</button>
      <button type="button" className="lava-quick-view" onClick={() => setQuickViewProduct(product)}>Quick view</button>
    </div>
    <div className="lava-product-info">
      <div className="lava-product-title-row"><button type="button" className="lava-product-name" onClick={() => openProduct(product)}>{product.name}</button><button type="button" className={`lava-wish-button ${wishlist.includes(product.id) ? "is-wished" : ""}`} aria-label={`${wishlist.includes(product.id) ? "Remove" : "Add"} ${product.name} ${wishlist.includes(product.id) ? "from" : "to"} wishlist`} onClick={() => toggleWishlist(product.id)}>{wishlist.includes(product.id) ? "♥ Saved" : "♡ Save"}</button></div>
      <span className="lava-product-category">{product.category}</span>
      <div className="lava-product-rating"><span aria-label={`${product.rating} out of 5 stars`}>★★★★★</span><b>{product.rating}</b><small>({product.reviews})</small></div>
      <div className="lava-product-prices"><b>{money(product.price)}</b>{product.oldPrice > product.price && <del>{money(product.oldPrice)}</del>}</div>
      <button type="button" className="lava-add-button" disabled={!product.stock} onClick={() => addToCart(product)}>{product.stock ? "Add to cart" : "Out of stock"} <span>＋</span></button>
    </div>
  </article>;

  const productGrid = (items: Product[], compact = false) => items.length
    ? <div className={`lava-product-grid ${compact ? "is-compact" : ""}`}>{items.map((product) => productCard(product, compact))}</div>
    : <div className="lava-empty"><b>No products found</b><span>Try adjusting your filters or search.</span><button type="button" className="lava-text-button" onClick={resetFilters}>Clear filters</button></div>;

  const orderSummary = (showPromo = false) => <aside className="lava-order-summary">
    <h2>Order summary</h2>
    <p><span>Subtotal · {cartCount} item{cartCount === 1 ? "" : "s"}</span><b>{money(subtotal)}</b></p>
    <p><span>Shipping</span><b>{shippingCost === 0 ? "FREE" : money(shippingCost)}</b></p>
    {promoApplied && <p className="lava-discount"><span>WELCOME10 · 10% off</span><b>−{money(discount)}</b></p>}
    <p className="lava-summary-total"><span>Total</span><b>{money(total)}</b></p>
    {showPromo && <div className="lava-promo-control"><label htmlFor="lava-promo">Promo code</label><div><input id="lava-promo" value={promo} onChange={(event) => { setPromo(event.target.value); setPromoApplied(false); }} placeholder="Enter code" /><button type="button" onClick={() => {
      const validPromo = promo.trim().toUpperCase() === "WELCOME10";
      setPromoApplied(validPromo);
      setNotice(validPromo ? "WELCOME10 applied — your order total has been updated." : "That code did not work. Try WELCOME10.");
    }}>{promoApplied ? "Applied" : "Apply"}</button></div>{promoApplied && <small role="status">WELCOME10 applied — {money(discount)} off your order.</small>}</div>}
    <small className="lava-summary-note">{subtotal >= 100 ? "You unlocked free standard shipping." : "Free standard shipping on orders over $100."}</small>
  </aside>;

  return <main className="storefront lava-store">
    {screen !== "login" && <><div className="lava-announcement"><span>✦</span> WEEKEND EDIT · Take 10% off your first order with <b>WELCOME10</b><button type="button" aria-label="Dismiss offer" onClick={(event) => event.currentTarget.parentElement?.remove()}>×</button></div>
    <header className="store-header lava-header">
      <button type="button" className="store-brand lava-brand" onClick={() => goTo("home")} aria-label="Lava E-commerce home"><span className="store-brand-mark">L</span><span>LAVA <b>ECOMMERCE</b></span></button>
      <nav className="store-nav lava-nav" aria-label="Shop navigation">
        <button type="button" className={screen === "home" ? "active" : ""} onClick={() => goTo("home")}>Home</button>
        <button type="button" className={screen === "catalog" ? "active" : ""} onClick={() => goTo("catalog")}>Shop</button>
        <button type="button" className={screen === "account" ? "active" : ""} onClick={() => goTo("account")}>Orders</button>
      </nav>
      <label className="lava-header-search"><input type="search" aria-label="Search products" placeholder="Search products" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} /><button type="button" aria-label="Search" onClick={() => goTo("catalog")}>⌕</button></label>
      <div className="store-header-actions lava-header-actions">
        <button className="lava-header-account" type="button" onClick={() => goTo("account")} aria-label="My account"><Icon name="user" size={17} /><span>Account</span></button><button className="lava-signout-button" type="button" onClick={signOut}>Sign out</button>
        <button className={`lava-header-account lava-header-wishlist ${wishlist.length ? "has-wishlist" : ""}`} type="button" onClick={() => goTo("wishlist")} aria-label={`Wishlist, ${wishlist.length} ${wishlist.length === 1 ? "item" : "items"}`}><span className="lava-wishlist-heart" aria-hidden="true">{wishlist.length ? "♥" : "♡"}</span><span>Wishlist</span><i>{wishlist.length}</i></button>
        <button className="lava-header-account lava-header-cart" type="button" onClick={() => setCartDrawerOpen(true)} aria-label={`Cart, ${cartCount} items`}><Icon name="cart" size={18} /><span>Cart</span><i>{cartCount}</i></button>
        <a className="lava-testlab-link" href="/">TestLab</a>
      </div>
    </header></>}

    {screen === "login" && <section className="store-login-page lava-login-page">
      <div className="store-login-aside lava-login-aside"><span className="store-kicker">LAVA E-COMMERCE · DEMO STORE</span><h1>Everyday finds.<br />A little more <em>you.</em></h1><p>Discover thoughtful picks across home, tech, travel, and more. This is a local storefront demo with no real purchases.</p><div className="lava-login-highlights"><span>24 curated products</span><span>Secure demo checkout</span><span>Easy local order tracking</span></div><div className="lava-login-floats" aria-hidden="true"><span>HOME EDIT</span><span>TECH PICKS</span><span>JUST LANDED</span></div></div>
      <form className="store-login-card lava-login-card" onSubmit={(event) => {
        event.preventDefault();
        if (loginLoading) return;
        setLoginLoading(true);
        window.setTimeout(() => {
          if (email.trim().toLowerCase() !== storeDemoCredentials.email || password !== storeDemoCredentials.password) {
            setLoginError("Those credentials do not match the Lava E-commerce demo account.");
            setLoginLoading(false);
            return;
          }
          setLoginError("");
          setLoginLoading(false);
          goTo("home");
        }, 650);
      }}>
        <span className="store-kicker">YOUR ACCOUNT</span><h2>Welcome to Lava</h2><p>Sign in to shop, save favorites, and track your demo orders.</p>
        <label>Email address<input type="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Password<input type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {loginError && <p className="store-login-error" role="alert">{loginError}</p>}
        <button className="store-primary-button lava-button" type="submit" disabled={loginLoading}>{loginLoading && <span className="lava-spinner" aria-hidden="true" />}{loginLoading ? "Signing in…" : <>Sign in <span>→</span></>}</button>
        <div className="store-demo-credentials"><b>DEMO CREDENTIALS</b><span>Email · {storeDemoCredentials.email}</span><span>Password · {storeDemoCredentials.password}</span></div>
        <small>Demo only. No account or payment data is sent or stored.</small>
      </form>
    </section>}

    {screen === "home" && <div className="lava-home-page">
      <section className="lava-hero">
        <div className="lava-hero-content"><span className="store-kicker">THE LAVA WEEKEND EDIT · 2026</span><h1>Good finds.<br /><em>Better everyday.</em></h1><p>Thoughtful essentials for work, rest, and everywhere in between.</p><div><button type="button" className="store-primary-button lava-button" onClick={() => goTo("catalog")}>Shop the collection <span>→</span></button><span className="lava-hero-note">Curated for your everyday</span></div></div>
        <div className="lava-hero-art"><img src={mediaUrl("lava-home-hero.png")} alt="Lava E-commerce collection of everyday products" /></div>
      </section>
      <section className="lava-trust-strip"><span>✳ Thoughtful quality</span><span>↗ Easy 30-day returns</span><span>⌁ Free shipping over $100</span><span>◉ Secure demo checkout</span></section>
      <section className="lava-video-feature"><div><span className="store-kicker">A CLOSER LOOK</span><h2>Everyday, in motion.</h2><p>Take a look around the Lava collection.</p></div><video autoPlay muted loop playsInline aria-label="Lava E-commerce shopping video"><source src={mediaUrl("shopping-video.mp4")} type="video/mp4" /></video></section>
      <section className="lava-home-section">
        <div className="lava-section-heading"><div><span className="store-kicker">FIND YOUR EVERYDAY</span><h2>Shop by category</h2></div><button type="button" className="lava-text-button" onClick={() => goTo("catalog")}>View all categories →</button></div>
        <div className="lava-category-grid">{categories.slice(1).map((category, index) => <button type="button" className={`lava-category-tile lava-category-${index + 1}`} key={category} onClick={() => { setActiveCategory(category); setPage(1); goTo("catalog"); }}><img src={mediaUrl(`category-${category.toLowerCase()}.png`)} alt="" loading="lazy" /><span className="lava-category-index">0{index + 1}</span><b>{category}</b><span className="lava-category-arrow">↗</span></button>)}</div>
      </section>
      <section className="lava-promo-banner"><span className="store-kicker">A LITTLE SOMETHING EXTRA</span><h2>Your first find comes with 10% off.</h2><p>Use code <b>WELCOME10</b> at checkout. Because the good stuff should feel even better.</p><button type="button" onClick={() => { setPromo("WELCOME10"); setPromoApplied(true); goTo("catalog"); }}>Explore the edit <span>→</span></button><span className="lava-promo-orbit" aria-hidden="true">10%</span></section>
      <section className="lava-home-section lava-featured-section"><div className="lava-section-heading"><div><span className="store-kicker">CUSTOMER FAVORITES</span><h2>Trending right now</h2></div><button type="button" className="lava-text-button" onClick={() => { setSort("rating"); goTo("catalog"); }}>Shop best rated →</button></div>{productGrid(homeProducts, true)}</section>
      <section className="lava-testimonial"><span className="store-kicker">KIND WORDS, REAL GOOD ENERGY</span><div className="lava-quote-stars">★★★★★</div><blockquote>“The kind of everyday essentials that make you wonder how you did without them.”</blockquote><span>— Maya R. · Verified demo customer</span></section>
      <section className="lava-home-section lava-new-arrivals"><div className="lava-section-heading"><div><span className="store-kicker">JUST LANDED</span><h2>New finds to meet.</h2></div><button type="button" className="lava-text-button" onClick={() => { setSort("newest"); goTo("catalog"); }}>See all new arrivals →</button></div>{productGrid(newArrivals, true)}</section>
      <section className="lava-newsletter"><div><span className="store-kicker">NOTES FROM LAVA</span><h2>A good thing in your inbox.</h2><p>New finds, little rituals, and occasional offers. No noise.</p></div><form onSubmit={(event) => { event.preventDefault(); setNotice(`You’re on the list, ${newsletterEmail}.`); setNewsletterEmail(""); }}><input type="email" aria-label="Email for newsletter" placeholder="Your email address" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} required /><button type="submit">Join the list <span>→</span></button></form>{notice && <span className="lava-newsletter-status" role="status">{notice}</span>}</section>
    </div>}

    {screen === "catalog" && <section className="lava-page lava-catalog-page">
      <div className="lava-breadcrumb"><button type="button" onClick={() => goTo("home")}>Home</button><span>/</span><b>Shop all</b></div>
      <div className="lava-page-title"><div><span className="store-kicker">THE LAVA COLLECTION</span><h1>Find your everyday.</h1><p>Good design, useful details, and things you’ll reach for again.</p></div><span>{filteredProducts.length} products</span></div>
      <div className="lava-category-pills">{categories.map((category) => <button type="button" className={activeCategory === category ? "active" : ""} key={category} onClick={() => { setActiveCategory(category); setPage(1); }}>{category}</button>)}</div>
      <div className="lava-catalog-layout">
        <aside className="lava-filter-sidebar">
          <div className="lava-filter-heading"><b>Filter & refine</b><button type="button" onClick={resetFilters}>Clear all</button></div>
          <label className="lava-filter-label">Price up to <b>{money(maxPrice)}</b><input type="range" min="18" max="250" step="1" value={maxPrice} onChange={(event) => { setMaxPrice(Number(event.target.value)); setPage(1); }} /><div><span>$18</span><span>$250</span></div></label>
          <fieldset className="lava-filter-group"><legend>Customer rating</legend>{[4.5, 4, 3, 0].map((rating) => <label key={rating}><input type="radio" name="rating-filter" checked={minRating === rating} onChange={() => { setMinRating(rating); setPage(1); }} /><span>{rating ? `${rating}+ stars` : "All ratings"}</span></label>)}</fieldset>
          <label className="lava-stock-filter"><input type="checkbox" checked={inStockOnly} onChange={(event) => { setInStockOnly(event.target.checked); setPage(1); }} /> In stock only</label>
          <div className="lava-filter-note">All products are fictional demo listings.</div>
        </aside>
        <div className="lava-catalog-results">
          <div className="lava-catalog-toolbar"><span>Showing {filteredProducts.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredProducts.length)} of {filteredProducts.length}</span><label>Sort by <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Best rated</option><option value="newest">Newest</option></select></label></div>
          {productGrid(pageProducts)}
          {pageCount > 1 && <nav className="lava-pagination" aria-label="Product pages"><button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>← Previous</button><span>Page {page} of {pageCount}</span><button type="button" disabled={page === pageCount} onClick={() => setPage(page + 1)}>Next →</button></nav>}
        </div>
      </div>
    </section>}

    {screen === "product" && selectedProduct && <section className="lava-page lava-pdp-page">
      <div className="lava-breadcrumb"><button type="button" onClick={() => goTo("home")}>Home</button><span>/</span><button type="button" onClick={() => { setActiveCategory(selectedProduct.category); goTo("catalog"); }}>{selectedProduct.category}</button><span>/</span><b>{selectedProduct.name}</b></div>
      <div className="lava-pdp-layout">
        <div className="lava-gallery"><div className="lava-gallery-main"><img src={productImageUrl(selectedProduct.name)} alt={selectedProduct.name} /></div></div>
        <div className="lava-pdp-copy"><span className="store-kicker">{selectedProduct.category.toUpperCase()} · LAVA EDITION</span><h1>{selectedProduct.name}</h1><div className="lava-product-rating lava-pdp-rating"><span>★★★★★</span><b>{selectedProduct.rating}</b><small>{selectedProduct.reviews} verified reviews</small></div><div className="lava-pdp-price"><b>{money(selectedProduct.price)}</b>{selectedProduct.oldPrice > selectedProduct.price && <><del>{money(selectedProduct.oldPrice)}</del><span>Save {money(selectedProduct.oldPrice - selectedProduct.price)}</span></>}</div><p>{selectedProduct.description}</p>
          <div className="lava-pdp-stock">{selectedProduct.stock > 0 ? <><i /> In stock · ships in 1–2 days</> : <><i className="out" /> Currently out of stock</>}</div>
          <div className="lava-pdp-actions"><label>Qty <select aria-label="Quantity" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>{Array.from({ length: Math.min(5, selectedProduct.stock || 1) }, (_, index) => <option key={index + 1}>{index + 1}</option>)}</select></label><button type="button" className="store-primary-button lava-button" disabled={!selectedProduct.stock} onClick={() => addToCart(selectedProduct, quantity)}>Add to cart <span>＋</span></button><button type="button" className="lava-buy-now" disabled={!selectedProduct.stock} onClick={() => { addToCart(selectedProduct, quantity); goTo("checkout"); }}>Buy now →</button></div>
          <div className="lava-delivery-note"><b>Good things, delivered.</b><span>Free standard shipping over $100 · 30-day easy returns · Secure demo checkout.</span></div>
        </div>
      </div>
      <section className="lava-reviews"><span className="store-kicker">THE GOOD WORD</span><h2>Customer reviews</h2><p><b>★★★★★ {selectedProduct.rating} out of 5</b> · Based on {selectedProduct.reviews} reviews</p><div><article><span>★★★★★</span><b>Thoughtful and well made</b><p>Exactly what I was looking for. Great details and a lovely everyday feel.</p><small>Verified demo customer · 3 days ago</small></article><article><span>★★★★★</span><b>Would recommend</b><p>Arrived quickly in the sample journey and the quality feels considered.</p><small>Verified demo customer · 1 week ago</small></article></div></section>
      <section className="lava-home-section"><div className="lava-section-heading"><div><span className="store-kicker">KEEP EXPLORING</span><h2>You may also like</h2></div><button type="button" className="lava-text-button" onClick={() => goTo("catalog")}>Shop all →</button></div>{productGrid(products.filter((product) => product.category === selectedProduct.category && product.id !== selectedProduct.id).slice(0, 4), true)}</section>
    </section>}

    {screen === "wishlist" && <section className="lava-page">
      <div className="lava-page-title"><div><span className="store-kicker">SAVED FOR LATER</span><h1>Your wishlist.</h1><p>Keep the good finds close while you decide.</p></div><span>{wishlist.length} saved</span></div>
      {productGrid(products.filter((product) => wishlist.includes(product.id)))}
    </section>}

    {screen === "cart" && <section className="lava-page lava-checkout-page">
      <div className="lava-page-title"><div><span className="store-kicker">YOUR SELECTION</span><h1>Shopping cart.</h1><p>Review your finds before checkout.</p></div><button type="button" className="lava-text-button" onClick={() => goTo("catalog")}>← Continue shopping</button></div>
      {cartItems.length ? <div className="lava-cart-layout"><div className="lava-cart-list">{cartItems.map((product) => <article className="lava-cart-row" key={product.id}><button type="button" className="lava-cart-art" style={{ "--product-color": product.color, "--product-accent": product.accent } as React.CSSProperties} onClick={() => openProduct(product)}><img src={productImageUrl(product.name)} alt={product.name} loading="lazy" /></button><div className="lava-cart-product"><span>{product.category}</span><button type="button" onClick={() => openProduct(product)}>{product.name}</button><small>{product.stock > 0 ? "In stock — ready to ship" : "Out of stock"}</small><button type="button" className="lava-remove-item" onClick={() => removeFromCart(product.id)}>Remove item</button></div><div className="lava-quantity"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(product.id, -1)}>−</button><span>{cart[product.id]}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(product.id, 1)}>+</button></div><b className="lava-line-total">{money(product.price * cart[product.id])}</b></article>)}</div><div>{orderSummary(true)}<button type="button" className="store-primary-button lava-button lava-cart-checkout" onClick={() => { setCheckoutStep(1); goTo("checkout"); }}>Continue to checkout <span>→</span></button></div></div>
        : <div className="lava-empty"><b>Your cart is waiting.</b><span>Find something you’ll reach for every day.</span><button type="button" className="store-primary-button lava-button" onClick={() => goTo("catalog")}>Browse the collection →</button></div>}
    </section>}

    {screen === "checkout" && <section className="lava-page lava-checkout-page">
      <div className="lava-page-title"><div><span className="store-kicker">SECURE CHECKOUT · DEMO</span><h1>Let’s make it yours.</h1><p>Your demo details stay in this browser and are never sent.</p></div></div>
      <div className={`lava-checkout-steps ${checkoutTransitioning ? "is-transitioning" : ""}`}>{["Delivery", "Shipping", "Payment", "Review"].map((step, index) => <button type="button" key={step} className={checkoutStep === index + 1 ? "active" : checkoutStep > index + 1 ? "complete" : ""} onClick={() => { if (index + 1 < checkoutStep && !checkoutTransitioning) setCheckoutStep(index + 1); }}><i>{checkoutStep > index + 1 ? "✓" : `0${index + 1}`}</i>{step}</button>)}{checkoutTransitioning && <span className="lava-checkout-van" aria-hidden="true">🚚</span>}</div>
      <div className="lava-cart-layout lava-checkout-layout"><form className={`lava-checkout-form ${checkoutTransitioning ? "is-transitioning" : ""}`} onSubmit={submitCheckoutStep}>
        {checkoutStep === 1 && <><h2>1. Delivery details</h2><div className="lava-form-grid"><label>Full name<input autoComplete="name" required value={checkoutAddress.name} onChange={(event) => updateAddress("name", event.target.value)} /></label><label>Email address<input type="email" autoComplete="email" required value={checkoutAddress.email || email} onChange={(event) => updateAddress("email", event.target.value)} /></label><label>Phone number<input type="tel" inputMode="numeric" autoComplete="tel-national" pattern="[0-9]{10}" maxLength={10} title="Enter exactly 10 digits for a phone number." placeholder="10-digit phone number" required value={checkoutAddress.phone} onChange={(event) => { const value = event.target.value.replace(/\D/g, "").slice(0, 10); event.target.value = value; event.target.setCustomValidity(value.length === 10 ? "" : "Enter exactly 10 digits."); updateAddress("phone", value); }} /></label><label className="lava-form-wide">Street address<input autoComplete="street-address" required value={checkoutAddress.address} onChange={(event) => updateAddress("address", event.target.value)} /></label><label>City<input autoComplete="address-level2" required value={checkoutAddress.city} onChange={(event) => updateAddress("city", event.target.value)} /></label><label>Postal code<input type="text" autoComplete="postal-code" maxLength={12} title="Enter a postal code with 3–12 letters or numbers, including at least one number." placeholder="e.g. 10001" required value={checkoutAddress.postal} onChange={(event) => { const value = event.target.value; const valid = /^[A-Za-z0-9][A-Za-z0-9 -]{2,11}$/.test(value) && /\d/.test(value); event.target.setCustomValidity(value && !valid ? "Enter a postal code with 3–12 letters or numbers, including at least one number." : ""); updateAddress("postal", value); }} /></label></div></>}
        {checkoutStep === 2 && <><h2>2. Choose shipping</h2><label className="lava-shipping-option"><input type="radio" name="shipping" checked={shippingMethod === "standard"} onChange={() => setShippingMethod("standard")} /><span><b>Standard delivery</b><small>3–5 business days</small></span><strong>{subtotal >= 100 ? "FREE" : money(8)}</strong></label><label className="lava-shipping-option"><input type="radio" name="shipping" checked={shippingMethod === "express"} onChange={() => setShippingMethod("express")} /><span><b>Express delivery</b><small>1–2 business days</small></span><strong>{money(16)}</strong></label></>}
        {checkoutStep === 3 && <><h2>3. Payment method · Demo only</h2><label className="lava-shipping-option"><input type="radio" name="payment" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /><span><b>Credit or debit card</b><small>Test checkout only — no charge will be made.</small></span><strong>▰</strong></label><label className="lava-shipping-option"><input type="radio" name="payment" checked={paymentMethod === "wallet"} onChange={() => setPaymentMethod("wallet")} /><span><b>Digital wallet</b><small>Simulated payment method.</small></span><strong>◈</strong></label>{paymentMethod === "card" && <div className="lava-form-grid"><label className="lava-form-wide">Test card number<input type="text" autoComplete="cc-number" inputMode="numeric" maxLength={19} pattern="[0-9]{12,19}" placeholder="4242 4242 4242 4242" title="Enter 12–19 digits; letters and other characters are not accepted." required onChange={(event) => { const input = event.target; const digits = input.value.replace(/\D/g, "").slice(0, 19); input.value = digits; input.setCustomValidity(digits.length >= 12 ? "" : "Enter at least 12 digits."); }} /></label><label>Expiry date<input type="text" autoComplete="cc-exp" inputMode="numeric" maxLength={5} pattern="(0[1-9]|1[0-2])/[0-9]{2}" placeholder="MM/YY" title="Enter a valid future expiry date in MM/YY format." required onChange={(event) => { const input = event.target; const digits = input.value.replace(/\D/g, "").slice(0, 4); const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits; input.value = formatted; const match = formatted.match(/^(0[1-9]|1[0-2])\/(\d{2})$/); const now = new Date(); const valid = match !== null && (Number(match[2]) > now.getFullYear() % 100 || (Number(match[2]) === now.getFullYear() % 100 && Number(match[1]) >= now.getMonth() + 1)); input.setCustomValidity(valid ? "" : "Enter a valid future expiry date in MM/YY format."); }} /></label><label>Security code<input type="text" autoComplete="cc-csc" inputMode="numeric" maxLength={4} pattern="[0-9]{3,4}" placeholder="123" title="Enter a 3- or 4-digit security code." required onChange={(event) => { const input = event.target; const digits = input.value.replace(/\D/g, "").slice(0, 4); input.value = digits; input.setCustomValidity(digits.length >= 3 ? "" : "Enter a 3- or 4-digit security code."); }} /></label></div>}<small>No payment processor is connected. Do not enter a real payment card.</small></>}
        {checkoutStep === 4 && <><h2>4. Review your order</h2><div className="lava-review-address"><b>{checkoutAddress.name || "Demo customer"}</b><span>{checkoutAddress.address || "Sample address"}</span><span>{checkoutAddress.city} {checkoutAddress.postal}</span><span>{checkoutAddress.email || email}</span><button type="button" className="lava-text-button" onClick={() => setCheckoutStep(1)}>Edit delivery details</button></div>{cartItems.map((product) => <p className="lava-review-line" key={product.id}><span>{product.name} × {cart[product.id]}</span><b>{money(product.price * cart[product.id])}</b></p>)}</>}
        {checkoutTransitioning && <div className="lava-checkout-loading" role="status"><span className="lava-spinner" />{checkoutStep === 4 ? "Placing your demo order…" : "Moving to the next checkout step…"}</div>}
        <div className="lava-checkout-actions">{checkoutStep > 1 && <button type="button" className="lava-secondary-button" disabled={checkoutTransitioning} onClick={() => setCheckoutStep(checkoutStep - 1)}>← Back</button>}<button type="submit" className="store-primary-button lava-button" disabled={checkoutTransitioning}>{checkoutTransitioning ? "Please wait…" : checkoutStep === 4 ? `Place demo order · ${money(total)}` : "Continue"} {!checkoutTransitioning && <span>→</span>}</button></div>
      </form><div>{orderSummary(true)}</div></div>
    </section>}

    {screen === "confirmation" && <section className="lava-confirmation"><span className="lava-confirmation-mark">✓</span><span className="store-kicker">ORDER RECEIVED · LAVA E-COMMERCE</span><h1>Thanks for choosing well.</h1><p>Your demo order is confirmed. We’ve created a local tracking reference for you.</p><div className="lava-confirmation-card"><span>TRACKING / ORDER ID</span><b>{orderNumber}</b><div><p><span>Order status</span><strong>Processing</strong></p><p><span>Estimated delivery</span><strong>3–5 business days</strong></p><p><span>Demo total</span><strong>{money(orders[0]?.total ?? total)}</strong></p></div></div><div className="lava-confirmation-actions"><button type="button" className="store-primary-button lava-button" onClick={() => goTo("account")}>View your orders →</button><button type="button" className="lava-secondary-button" onClick={() => goTo("home")}>Continue shopping</button></div></section>}

    {screen === "account" && <section className="lava-page"><div className="lava-page-title"><div><span className="store-kicker">YOUR LAVA ACCOUNT</span><h1>Good to see you.</h1><p>{email || storeDemoCredentials.email} · your demo account</p></div><button type="button" className="lava-text-button" onClick={() => goTo("wishlist")}>♡ View wishlist ({wishlist.length})</button></div><div className="lava-account-summary"><article><span>ORDERS PLACED</span><b>{orders.length}</b></article><article><span>WISHLIST SAVED</span><b>{wishlist.length}</b></article><article><span>DEMO ACCOUNT</span><b>Active</b></article></div><section className="lava-orders-panel"><div className="lava-section-heading"><div><span className="store-kicker">YOUR RECENT ACTIVITY</span><h2>Order history</h2></div></div><div className="lava-orders-table-wrap"><table className="lava-orders-table"><thead><tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{order.date}</td><td>{order.items.join(", ")}</td><td>{money(order.total)}</td><td><span className={`lava-order-status status-${order.status.toLowerCase()}`}>{order.status}</span></td></tr>)}</tbody></table></div></section><div className="lava-saved-details"><article><span className="store-kicker">SAVED ADDRESS</span><b>{checkoutAddress.name || "Add a delivery address"}</b><p>{checkoutAddress.address ? `${checkoutAddress.address}, ${checkoutAddress.city} ${checkoutAddress.postal}` : "Your checkout address will appear here."}</p></article><article><span className="store-kicker">PAYMENT METHODS</span><b>Demo payment only</b><p>No payment details are saved to this account.</p></article></div></section>}

    {screen === "admin" && <section className="lava-page lava-admin-page"><div className="lava-page-title"><div><span className="store-kicker">LAVA E-COMMERCE · ADMIN</span><h1>Store overview.</h1><p>Manage the local demo catalog and order statuses.</p></div><span className="lava-admin-chip">DEMO ADMIN</span></div><div className="lava-admin-metrics"><article><span>TOTAL REVENUE</span><b>{money(orders.reduce((sum, order) => sum + order.total, 0))}</b><small>Demo order value</small></article><article><span>TOTAL ORDERS</span><b>{orders.length}</b><small>Local sample orders</small></article><article><span>ACTIVE USERS</span><b>128</b><small>Demo analytics</small></article><article><span>CONVERSION</span><b>3.8%</b><small>Illustrative only</small></article></div><section className="lava-admin-panel"><div className="lava-section-heading"><div><span className="store-kicker">CATALOG MANAGEMENT</span><h2>{editingProductId ? "Edit product" : "Add a product"}</h2></div></div><form className="lava-admin-product-form" onSubmit={addProduct}><label>Product name<input value={newProductName} onChange={(event) => setNewProductName(event.target.value)} placeholder="Product title" required /></label><label>Price<input type="number" min="0.01" step="0.01" value={newProductPrice} onChange={(event) => setNewProductPrice(event.target.value)} placeholder="0.00" required /></label><button type="submit" className="store-primary-button lava-button">{editingProductId ? "Save changes" : "Add product"} →</button>{editingProductId !== null && <button type="button" className="lava-secondary-button" onClick={() => { setEditingProductId(null); setNewProductName(""); setNewProductPrice(""); }}>Cancel</button>}</form>{notice && <p className="lava-admin-notice" role="status">{notice}</p>}<div className="lava-orders-table-wrap"><table className="lava-orders-table lava-admin-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{product.category}</td><td>{money(product.price)}</td><td>{product.stock}</td><td><button type="button" onClick={() => editProduct(product)}>Edit</button><button type="button" className="danger" onClick={() => removeProduct(product)}>Delete</button></td></tr>)}</tbody></table></div></section><section className="lava-admin-panel"><div className="lava-section-heading"><div><span className="store-kicker">FULFILMENT</span><h2>Order management</h2></div></div><div className="lava-orders-table-wrap"><table className="lava-orders-table"><thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{email || storeDemoCredentials.email}</td><td>{money(order.total)}</td><td><select aria-label={`Status for ${order.id}`} value={order.status} onChange={(event) => setOrders((current) => current.map((entry) => entry.id === order.id ? { ...entry, status: event.target.value } : entry))}><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></td></tr>)}</tbody></table></div></section></section>}

    {notice && screen !== "login" && screen !== "admin" && <div className="lava-toast" role="status">{notice}</div>}
    {screen !== "login" && <footer className="store-footer lava-footer"><div><button type="button" className="lava-footer-brand" onClick={() => goTo("home")}>LAVA E-COMMERCE</button><p>Thoughtful finds for your everyday. A fictional, local-only shopping demo.</p><a href="/">← Back to Lava TestLab</a></div><div><b>EXPLORE</b><button type="button" onClick={() => goTo("catalog")}>Shop all</button><button type="button" onClick={() => goTo("wishlist")}>Wishlist</button><button type="button" onClick={() => goTo("account")}>My orders</button></div><div><b>DEMO TOOLS</b><button type="button" onClick={() => goTo("admin")}>Admin dashboard</button><a href="/">Lava TestLab</a><span>Support · hello@lava.test</span></div><div><b>GET THE GOOD NOTES</b><form onSubmit={(event) => { event.preventDefault(); setNotice("Thanks for joining the demo newsletter."); setNewsletterEmail(""); }}><input type="email" aria-label="Footer newsletter email" placeholder="Email address" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} required /><button type="submit">Join →</button></form><small>Instagram · Pinterest · YouTube</small></div><div className="lava-footer-bottom"><span>© 2026 Lava E-commerce · Demo experience</span><span>Fictional products · No real orders or payment processing</span></div></footer>}

    {cartDrawerOpen && <div className="lava-drawer-backdrop" onClick={() => setCartDrawerOpen(false)}><aside className="lava-cart-drawer" role="dialog" aria-modal="true" aria-label="Your shopping cart" onClick={(event) => event.stopPropagation()}><div className="lava-drawer-heading"><div><span className="store-kicker">YOUR SELECTION</span><h2>Shopping cart <small>{cartCount}</small></h2></div><button type="button" aria-label="Close cart" onClick={() => setCartDrawerOpen(false)}>×</button></div>{cartItems.length ? <><div className="lava-drawer-items">{cartItems.map((product) => <article className="lava-drawer-item" key={product.id}><div className="lava-drawer-art" style={{ "--product-color": product.color } as React.CSSProperties}><img src={productImageUrl(product.name)} alt="" loading="lazy" /></div><div><b>{product.name}</b><span>{money(product.price)}</span><div className="lava-quantity"><button type="button" aria-label={`Remove one ${product.name}`} onClick={() => changeQuantity(product.id, -1)}>−</button><span>{cart[product.id]}</span><button type="button" aria-label={`Add one ${product.name}`} onClick={() => changeQuantity(product.id, 1)}>+</button></div><button type="button" className="lava-drawer-remove" onClick={() => removeFromCart(product.id)}>Remove item</button></div></article>)}</div><div className="lava-drawer-bottom"><p><span>Subtotal</span><b>{money(subtotal)}</b></p><small>{subtotal >= 100 ? "Free shipping unlocked." : `${money(100 - subtotal)} away from free shipping.`}</small><button type="button" className="store-primary-button lava-button" onClick={() => { setCartDrawerOpen(false); setCheckoutStep(1); goTo("cart"); }}>View cart & checkout →</button><button type="button" className="lava-text-button" onClick={() => setCartDrawerOpen(false)}>Keep exploring</button></div></> : <div className="lava-empty"><b>Your cart is empty.</b><button type="button" className="lava-text-button" onClick={() => { setCartDrawerOpen(false); goTo("catalog"); }}>Explore the collection →</button></div>}</aside></div>}

    {quickViewProduct && <div className="lava-quickview-backdrop" onClick={() => setQuickViewProduct(null)}><section className="lava-quickview" role="dialog" aria-modal="true" aria-label={`Quick view: ${quickViewProduct.name}`} onClick={(event) => event.stopPropagation()}><button type="button" className="lava-quickview-close" aria-label="Close quick view" onClick={() => setQuickViewProduct(null)}>×</button><div className="lava-quickview-art" style={{ "--product-color": quickViewProduct.color, "--product-accent": quickViewProduct.accent } as React.CSSProperties}><img src={productImageUrl(quickViewProduct.name)} alt={quickViewProduct.name} /></div><div><span className="store-kicker">{quickViewProduct.category}</span><h2>{quickViewProduct.name}</h2><div className="lava-product-rating"><span>★★★★★</span><b>{quickViewProduct.rating}</b></div><p>{quickViewProduct.description}</p><b className="lava-quickview-price">{money(quickViewProduct.price)}</b><div className="lava-quickview-actions"><button type="button" className="store-primary-button lava-button" disabled={!quickViewProduct.stock} onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}>Add to cart →</button><button type="button" className="lava-text-button" onClick={() => { setQuickViewProduct(null); openProduct(quickViewProduct); }}>View details</button></div></div></section></div>}

    {screen !== "login" && <button type="button" className="lava-admin-shortcut" onClick={() => goTo("admin")}>Admin</button>}
  </main>;
}
