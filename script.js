'use strict';
// Requires i18n.js to be loaded first (provides t, translateStatic, setLang)
const SHIP_MIN = 50, SHIP_FEE = 5.99;
const A = 'assets/aistudio/';
const usd = n => '$' + n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const r2 = n => Math.round(n * 100) / 100;

// Values/labels are translation keys; t() returns the text itself when there is no key (e.g. '90%')
const STATS = [['90%','stat.fat'],['stat.double','stat.protein'],['100%','stat.natural'],['1/3','stat.calories'],['2×','stat.protein']];
const FEATURES = [
  ['feat.1.t','feat.1.d'],
  ['feat.2.t','feat.2.d'],
  ['feat.3.t','feat.3.d'],
  ['feat.4.t','feat.4.d'],
  ['feat.5.t','feat.5.d']
];
// English text below is also the translation key (see i18n.js)
const BUNDLES = [
  {id:'bundle-complete',name:'The Complete Collection',price:45,originalPrice:60,rating:4.95,image:A+'bundle-complete-4pack.png',description:'Save 25% on all 4: Honey Butter and Chili Lime in 250g Jar and 100g Pouch.'},
  {id:'bundle-nut-lovers',name:'Artisan 250g Jar Duo',price:30,originalPrice:40,rating:4.93,image:A+'bundle-jars-duo.png',description:'Both signature 250g jars, Honey Butter and Chili Lime, sealed for peak crunch.'},
  {id:'bundle-best-seller',name:'Artisan 100g Pouch Duo',price:15,originalPrice:20,rating:4.89,image:A+'bundle-pouches-duo.png',description:'Both resealable 100g pouches, made for snacking, travel, and gifting.'}
];
const PRODUCTS = [
  {id:'honey-butter-100g-pouch',name:'Artisan Roasted Cashews',flavor:'Honey Butter',packageSize:'100g Pouch',price:10,rating:4.9,reviewCount:342,image:A+'product-honey-butter-pouch-100g.png',description:'Glazed in golden wildflower honey and creamy cultured butter.'},
  {id:'chili-lime-100g-pouch',name:'Artisan Roasted Cashews',flavor:'Chili Lime',packageSize:'100g Pouch',price:10,rating:4.9,reviewCount:284,image:A+'product-chili-lime-pouch-100g.png',description:'Tossed with sun-ripened red chili and fresh lime zest.'},
  {id:'honey-butter-250g-jar',name:'Artisan Roasted Cashews',flavor:'Honey Butter',packageSize:'250g Jar',price:20,rating:4.95,reviewCount:418,image:A+'product-honey-butter-jar-250g.png',description:'Signature jar of jumbo cashews in rich Honey Butter glaze.'},
  {id:'chilli-lime-250g-jar',name:'Artisan Roasted Cashews',flavor:'Chili Lime',packageSize:'250g Jar',price:20,rating:4.92,reviewCount:365,image:A+'product-chilli-lime-jar-250g.png',description:'Seasoned with fiery red chili and bright citrus lime.'}
];

// ---- State (replaces React useState) ----
const state = { cart: [], promo: false };

// ---- Cart logic (from storeLogic.ts) ----
function summarize(items, promo) {
  let count = 0, subtotal = 0, original = 0, autoship = 0;
  for (const i of items) {
    if (i.quantity <= 0) continue;
    count += i.quantity;
    const unit = i.isAutoship ? r2(i.price * 0.85) : i.price;
    if (i.isAutoship) autoship += (i.price - unit) * i.quantity;
    subtotal += unit * i.quantity;
    original += i.originalPrice * i.quantity;
  }
  const discount = promo ? r2(subtotal * 0.15) : 0;
  const after = Math.max(0, subtotal - discount);
  const shipFee = after >= SHIP_MIN || after === 0 ? 0 : SHIP_FEE;
  return {count, subtotal: r2(subtotal), original: r2(original), discount, autoship: r2(autoship), shipFee,
    total: r2(after + shipFee), progress: Math.min(100, Math.round(after / SHIP_MIN * 100)), free: after >= SHIP_MIN};
}

// Cart items store translation KEYS (name / flavor / variantLabel), not translated text,
// so the bag re-translates correctly when the language changes.
const itemLabel = i => t(i.name) + (i.flavor ? ` (${t(i.flavor)})` : '');

function addItem(item) {
  const found = state.cart.find(i => i.id === item.id);
  if (found) found.quantity++; else state.cart.push({...item, quantity: 1});
  toast(t('toast.added', {name: itemLabel(item)}));
  render();
}
const addProduct = p => addItem({id: `${p.id}-${p.packageSize}-once`, name: p.name, flavor: p.flavor, variantLabel: p.packageSize,
  price: p.price, originalPrice: p.price, image: p.image, isAutoship: false});
const addBundle = b => addItem({id: b.id, name: b.name, variantLabel: 'bundle.variant',
  price: b.price, originalPrice: b.originalPrice, image: b.image});

// ---- Rendering ----
const $ = id => document.getElementById(id);
function card(o, kind) {
  const el = document.createElement('article');
  el.className = 'card';
  const name = t(o.name);
  const sub = kind === 'p' ? `${t(o.flavor)} · ${t(o.packageSize)}` : '';
  el.innerHTML = `<img src="${o.image}" alt="${name}" loading="lazy"><h3>${name}</h3>${sub ? `<strong>${sub}</strong>` : ''}
    <p>${t(o.description)}</p><div class="rating">★ ${o.rating}${o.reviewCount ? ` (${o.reviewCount})` : ''}</div>
    <div class="price"><strong>${usd(o.price)}</strong>${o.originalPrice > o.price ? `<s>${usd(o.originalPrice)}</s>` : ''}</div>
    <button class="btn btn-brown">${t('btn.add')}</button>`;
  el.querySelector('button').onclick = () => kind === 'p' ? addProduct(o) : addBundle(o);
  return el;
}

// Parts of the page that are built from JS data (rebuilt on language change)
function renderCatalog() {
  $('stats').innerHTML = STATS.map(([a, b]) => `<div><b>${t(a)}</b>${t(b)}</div>`).join('');
  $('featureGrid').innerHTML = FEATURES.map(([ti, d]) => `<div class="card feature"><h3>${t(ti)}</h3><p>${t(d)}</p></div>`).join('');
  $('bundleGrid').innerHTML = '';
  $('productGrid').innerHTML = '';
  BUNDLES.forEach(b => $('bundleGrid').appendChild(card(b, 'b')));
  PRODUCTS.forEach(p => $('productGrid').appendChild(card(p, 'p')));
}

function render() {
  const s = summarize(state.cart, state.promo);
  $('cartCount').textContent = s.count;
  $('cartTotal').textContent = usd(s.total);
  $('shipBar').style.width = s.progress + '%';
  $('shipMsg').textContent = s.free ? t('cart.free') : t('cart.more', {amount: usd(SHIP_MIN - (s.subtotal - s.discount))});
  $('promoBox').checked = state.promo;

  const ul = $('cartItems');
  ul.innerHTML = state.cart.length ? '' : `<li class="empty" style="display:block">${t('cart.empty')}</li>`;
  state.cart.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${i.image}" alt=""><div><strong>${itemLabel(i)}</strong><div>${t(i.variantLabel || '')}</div>
      <div class="qty"><button data-d="-1">−</button><span>${i.quantity}</span><button data-d="1">+</button>
      <button data-rm style="width:auto;border-radius:9px;padding:0 8px">${t('cart.remove')}</button></div></div><strong>${usd(i.price * i.quantity)}</strong>`;
    li.querySelectorAll('[data-d]').forEach(b => b.onclick = () => {
      i.quantity += +b.dataset.d;
      state.cart = state.cart.filter(x => x.quantity > 0);
      render();
    });
    li.querySelector('[data-rm]').onclick = () => { state.cart = state.cart.filter(x => x.id !== i.id); render(); };
    ul.appendChild(li);
  });

  const row = (l, v, c = '') => `<div class="${c}"><dt>${l}</dt><dd style="margin:0">${v}</dd></div>`;
  $('summary').innerHTML = row(t('cart.subtotal'), usd(s.subtotal))
    + (s.autoship ? row(t('cart.autoship'), '−' + usd(s.autoship)) : '')
    + (s.discount ? row(t('cart.promoRow'), '−' + usd(s.discount)) : '')
    + row(t('cart.shipping'), s.shipFee ? usd(s.shipFee) : t('cart.freeShip'))
    + row(t('cart.total'), usd(s.total), 'total');
}

// Called by setLang() in i18n.js
function renderAll() { renderCatalog(); render(); }

let toastTimer;
function toast(msg) {
  $('toastMsg').textContent = '✓ ' + msg;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast').hidden = true, 3200);
}
function setCart(open) {
  $('cart').classList.toggle('open', open);
  $('cart').setAttribute('aria-hidden', String(!open));
  $('overlay').hidden = !open;
}
function setModal(open) { $('modal').hidden = !open; }

// ---- Init ----
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => setLang(b.dataset.lang));
$('cartBtn').onclick = $('toastView').onclick = () => setCart(true);
$('closeCart').onclick = $('overlay').onclick = () => setCart(false);
$('offerBtn').onclick = $('claimBtn').onclick = () => setModal(true);
$('closeModal').onclick = () => setModal(false);
$('unlockBtn').onclick = () => { state.promo = true; setModal(false); toast(t('toast.unlocked')); render(); };
$('promoBox').onchange = e => { state.promo = e.target.checked; render(); };
$('clearBtn').onclick = () => { state.cart = []; render(); };
$('checkoutBtn').onclick = () => toast(t(state.cart.length ? 'toast.checkoutDemo' : 'cart.empty'));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { setCart(false); setModal(false); } });

translateStatic();   // apply saved language (English by default) to the HTML
renderAll();