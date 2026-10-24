'use strict';
const SHIP_MIN = 50, SHIP_FEE = 5.99;
const A = 'assets/aistudio/';
const usd = n => '$' + n.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const r2 = n => Math.round(n * 100) / 100;

const STATS = [['90%','Less fat'],['Double','Protein'],['100%','natural'],['1/3','Calories'],['2×','Protein']];
const FEATURES = [
  ['Made From\nReal Nuts','Crafted from premium roasted Kampot cashews with zero fillers or preservatives.'],
  ['Slow\nRoasted','Slow dry-roasting locks in natural aroma and rich buttery crunch.'],
  ['No Refined\nSugar','Glazed only with pure wildflower honey or natural citrus.'],
  ['No Artificial\nFlavoring','What you taste is 100% authentic Kampot cashews.'],
  ['2× The\nProtein','Clean plant protein and heart-healthy minerals in every serving.']
];
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
function addItem(item) {
  const found = state.cart.find(i => i.id === item.id);
  if (found) found.quantity++; else state.cart.push({...item, quantity: 1});
  toast('Added to bag — ' + item.name);
  render();
}
const addProduct = p => addItem({id: `${p.id}-${p.packageSize}-once`, name: `${p.name} (${p.flavor})`, variantLabel: p.packageSize,
  price: p.price, originalPrice: p.price, image: p.image, isAutoship: false});
const addBundle = b => addItem({id: b.id, name: b.name, variantLabel: '25% OFF Bundle + Free Spoon & Recipe Book',
  price: b.price, originalPrice: b.originalPrice, image: b.image});

// ---- Rendering ----
const $ = id => document.getElementById(id);
function card(o, kind) {
  const el = document.createElement('article');
  el.className = 'card';
  const sub = kind === 'p' ? `${o.flavor} · ${o.packageSize}` : '';
  el.innerHTML = `<img src="${o.image}" alt="${o.name}" loading="lazy"><h3>${o.name}</h3>${sub ? `<strong>${sub}</strong>` : ''}
    <p>${o.description}</p><div class="rating">★ ${o.rating}${o.reviewCount ? ` (${o.reviewCount})` : ''}</div>
    <div class="price"><strong>${usd(o.price)}</strong>${o.originalPrice > o.price ? `<s>${usd(o.originalPrice)}</s>` : ''}</div>
    <button class="btn btn-brown">Add to Cart</button>`;
  el.querySelector('button').onclick = () => kind === 'p' ? addProduct(o) : addBundle(o);
  return el;
}
function render() {
  const s = summarize(state.cart, state.promo);
  $('cartCount').textContent = s.count;
  $('cartTotal').textContent = usd(s.total);
  $('shipBar').style.width = s.progress + '%';
  $('shipMsg').textContent = s.free ? '🎉 You’ve unlocked free shipping!' : `Add ${usd(SHIP_MIN - (s.subtotal - s.discount))} more for free shipping`;
  $('promoBox').checked = state.promo;

  const ul = $('cartItems');
  ul.innerHTML = state.cart.length ? '' : '<li class="empty" style="display:block">Your bag is empty.</li>';
  state.cart.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${i.image}" alt=""><div><strong>${i.name}</strong><div>${i.variantLabel || ''}</div>
      <div class="qty"><button data-d="-1">−</button><span>${i.quantity}</span><button data-d="1">+</button>
      <button data-rm style="width:auto;border-radius:9px;padding:0 8px">Remove</button></div></div><strong>${usd(i.price * i.quantity)}</strong>`;
    li.querySelectorAll('[data-d]').forEach(b => b.onclick = () => {
      i.quantity += +b.dataset.d;
      state.cart = state.cart.filter(x => x.quantity > 0);
      render();
    });
    li.querySelector('[data-rm]').onclick = () => { state.cart = state.cart.filter(x => x.id !== i.id); render(); };
    ul.appendChild(li);
  });

  const row = (l, v, c = '') => `<div class="${c}"><dt>${l}</dt><dd style="margin:0">${v}</dd></div>`;
  $('summary').innerHTML = row('Subtotal', usd(s.subtotal))
    + (s.autoship ? row('Autoship savings', '−' + usd(s.autoship)) : '')
    + (s.discount ? row('First-order 15% off', '−' + usd(s.discount)) : '')
    + row('Shipping', s.shipFee ? usd(s.shipFee) : 'Free')
    + row('Total', usd(s.total), 'total');
}

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
$('stats').innerHTML = STATS.map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join('');
$('featureGrid').innerHTML = FEATURES.map(([t, d]) => `<div class="card feature"><h3>${t}</h3><p>${d}</p></div>`).join('');
BUNDLES.forEach(b => $('bundleGrid').appendChild(card(b, 'b')));
PRODUCTS.forEach(p => $('productGrid').appendChild(card(p, 'p')));

$('cartBtn').onclick = $('toastView').onclick = () => setCart(true);
$('closeCart').onclick = $('overlay').onclick = () => setCart(false);
$('offerBtn').onclick = $('claimBtn').onclick = () => setModal(true);
$('closeModal').onclick = () => setModal(false);
$('unlockBtn').onclick = () => { state.promo = true; setModal(false); toast('Discount unlocked! Applied.'); render(); };
$('promoBox').onchange = e => { state.promo = e.target.checked; render(); };
$('clearBtn').onclick = () => { state.cart = []; render(); };
$('checkoutBtn').onclick = () => toast(state.cart.length ? 'Checkout is not connected in this demo.' : 'Your bag is empty.');
document.addEventListener('keydown', e => { if (e.key === 'Escape') { setCart(false); setModal(false); } });
render();
