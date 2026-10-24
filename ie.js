'use strict';

// ---------------------------------------------------------------
// Translations
// - Keys like 'nav.shop' are used by data-i18n attributes in the HTML.
// - Product / bundle text uses the ENGLISH TEXT ITSELF as the key, so
//   English needs no entry for those (t() falls back to the key).
// ---------------------------------------------------------------
const I18N = {
  en: {
    'meta.title': 'Kampot Harvest Co. | The Pride of Kampot, Roasted to Perfection.',
    'meta.desc': 'Artisan Roasted Cashews in Honey Butter and Chilli Lime.',
    'skip': 'Skip to content',
    'lang.label': 'Language',

    'nav.shop': 'Shop',
    'nav.bundles': 'Bundles',
    'nav.way': 'The Kampot Way',
    'nav.offer': '15% OFF First Order',
    'nav.bag': 'Bag',
    'nav.bagLabel': 'Open cart',

    'hero.l1': 'The Pride of Kampot,',
    'hero.l2': 'Roasted to Perfection.',
    'hero.text': 'Hand-selected Cambodian cashews slow-roasted in small batches. Infused with wild forest honey, creamy churned butter, and sun-dried Kampot bird’s eye chili.',
    'hero.cta': 'Go Shop',
    'hero.alt': 'Kampot Harvest cashew collection',

    'stat.fat': 'Less fat',
    'stat.double': 'Double',
    'stat.protein': 'Protein',
    'stat.natural': 'natural',
    'stat.calories': 'Calories',

    'offer.pill': '★ Limited Batch Roasted Fresh in Kampot ★',
    'offer.title': '25% OFF',
    'offer.sub': 'Don’t Miss This Bundle Offer',
    'offer.text': 'Save 25% On Artisan Roasted Cashews: Honey Butter & Chili Lime in 250g Jar ($20) & 100g Pouch ($10)',
    'offer.claim': 'Claim Offer',

    'btn.add': 'Add to Cart',
    'bundle.variant': '25% OFF Bundle + Free Spoon & Recipe Book',

    'feat.1.t': 'Made From\nReal Nuts',
    'feat.1.d': 'Crafted from premium roasted Kampot cashews with zero fillers or preservatives.',
    'feat.2.t': 'Slow\nRoasted',
    'feat.2.d': 'Slow dry-roasting locks in natural aroma and rich buttery crunch.',
    'feat.3.t': 'No Refined\nSugar',
    'feat.3.d': 'Glazed only with pure wildflower honey or natural citrus.',
    'feat.4.t': 'No Artificial\nFlavoring',
    'feat.4.d': 'What you taste is 100% authentic Kampot cashews.',
    'feat.5.t': '2× The\nProtein',
    'feat.5.d': 'Clean plant protein and heart-healthy minerals in every serving.',

    'footer.p1': 'Crafted in small batches with single-origin Cambodian cashews. Choose your favorite flavor in on-the-go resealable pouches or reusable glass jars.',
    'footer.p2': 'The Pride of Kampot, Roasted to Perfection. Taste the difference from the first bite.',

    'toast.view': 'View bag',
    'toast.added': 'Added to bag — {name}',
    'toast.unlocked': 'Discount unlocked! Applied.',
    'toast.checkoutDemo': 'Checkout is not connected in this demo.',

    'cart.title': 'Your Bag',
    'cart.close': 'Close',
    'cart.free': '🎉 You’ve unlocked free shipping!',
    'cart.more': 'Add {amount} more for free shipping',
    'cart.promo': 'Apply 15% first-order code',
    'cart.subtotal': 'Subtotal',
    'cart.autoship': 'Autoship savings',
    'cart.promoRow': 'First-order 15% off',
    'cart.shipping': 'Shipping',
    'cart.freeShip': 'Free',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.clear': 'Clear bag',
    'cart.empty': 'Your bag is empty.',
    'cart.remove': 'Remove',

    'modal.title': '15% OFF Your First Order',
    'modal.text': 'Unlock your welcome discount on any Kampot Harvest Co. cashews.',
    'modal.unlock': 'Unlock Discount',
    'modal.no': 'No thanks'
  },

  km: {
    'meta.title': 'Kampot Harvest Co. | មោទនភាពនៃកំពត អាំងយ៉ាងឆ្ងាញ់ឥតខ្ចោះ។',
    'meta.desc': 'ស្វាយចន្ទីអាំងសិប្បកម្មរសជាតិទឹកឃ្មុំប៊ឺ និងម្ទេសក្រូចឆ្មា។',
    'skip': 'រំលងទៅមាតិកា',
    'lang.label': 'ភាសា',

    'nav.shop': 'ទិញទំនិញ',
    'nav.bundles': 'កញ្ចប់ពិសេស',
    'nav.way': 'វិធីកំពត',
    'nav.offer': 'បញ្ចុះតម្លៃ 15% លើការបញ្ជាទិញលើកដំបូង',
    'nav.bag': 'កន្ត្រក',
    'nav.bagLabel': 'បើកកន្ត្រកទិញទំនិញ',

    'hero.l1': 'មោទនភាពនៃកំពត',
    'hero.l2': 'អាំងយ៉ាងឆ្ងាញ់ឥតខ្ចោះ។',
    'hero.text': 'ស្វាយចន្ទីកម្ពុជាជ្រើសរើសដោយដៃ អាំងយឺតៗជាបាច់តូចៗ ជ្រាបដោយទឹកឃ្មុំព្រៃ ប៊ឺក្រែមរលោង និងម្ទេសកំពតសម្ងួតថ្ងៃ។',
    'hero.cta': 'ទិញឥឡូវនេះ',
    'hero.alt': 'បណ្តុំស្វាយចន្ទី Kampot Harvest',

    'stat.fat': 'ខ្លាញ់តិចជាង',
    'stat.double': 'ទ្វេដង',
    'stat.protein': 'ប្រូតេអ៊ីន',
    'stat.natural': 'ធម្មជាតិ',
    'stat.calories': 'កាឡូរី',

    'offer.pill': '★ បាច់មានកំណត់ អាំងស្រស់ៗនៅកំពត ★',
    'offer.title': 'បញ្ចុះតម្លៃ 25%',
    'offer.sub': 'កុំខកខានការផ្តល់ជូនកញ្ចប់នេះ',
    'offer.text': 'សន្សំ 25% លើស្វាយចន្ទីអាំងសិប្បកម្ម៖ ទឹកឃ្មុំប៊ឺ និងម្ទេសក្រូចឆ្មា ក្នុងដប 250ក្រាម ($20) និងថង់ 100ក្រាម ($10)',
    'offer.claim': 'ទទួលការផ្តល់ជូន',

    'btn.add': 'ដាក់ក្នុងកន្ត្រក',
    'bundle.variant': 'កញ្ចប់បញ្ចុះតម្លៃ 25% + ស្លាបព្រាឥតគិតថ្លៃ និងសៀវភៅរូបមន្ត',

    'feat.1.t': 'ធ្វើពី\nគ្រាប់ពិតៗ',
    'feat.1.d': 'ផលិតពីស្វាយចន្ទីកំពតគុណភាពខ្ពស់ ដោយគ្មានសារធាតុបំពេញ ឬសារធាតុរក្សាទុក។',
    'feat.2.t': 'អាំង\nយឺតៗ',
    'feat.2.d': 'ការអាំងស្ងួតយឺតៗរក្សាក្លិនក្រអូបធម្មជាតិ និងភាពស្រួយមានរសជាតិប៊ឺ។',
    'feat.3.t': 'គ្មានស្ករ\nកែច្នៃ',
    'feat.3.d': 'ស្រោបតែជាមួយទឹកឃ្មុំផ្កាព្រៃសុទ្ធ ឬក្រូចធម្មជាតិប៉ុណ្ណោះ។',
    'feat.4.t': 'គ្មានគ្រឿងចាប់ក្លិន\nសិប្បនិម្មិត',
    'feat.4.d': 'រសជាតិដែលអ្នកភ្លក្សគឺស្វាយចន្ទីកំពតពិតប្រាកដ 100%។',
    'feat.5.t': 'ប្រូតេអ៊ីន\nទ្វេដង',
    'feat.5.d': 'ប្រូតេអ៊ីនរុក្ខជាតិសុទ្ធ និងរ៉ែជាតិល្អសម្រាប់បេះដូង ក្នុងមួយចំណែកនីមួយៗ។',

    'footer.p1': 'ផលិតជាបាច់តូចៗពីស្វាយចន្ទីកម្ពុជាប្រភពតែមួយ។ ជ្រើសរើសរសជាតិដែលអ្នកចូលចិត្តក្នុងថង់បិទជិតងាយស្រួលយកតាម ឬដបកញ្ចក់ប្រើឡើងវិញបាន។',
    'footer.p2': 'មោទនភាពនៃកំពត អាំងយ៉ាងឆ្ងាញ់ឥតខ្ចោះ។ ភ្លក្សភាពខុសគ្នាចាប់ពីខាំដំបូង។',

    'toast.view': 'មើលកន្ត្រក',
    'toast.added': 'បានបន្ថែមទៅកន្ត្រក — {name}',
    'toast.unlocked': 'បានដោះសោការបញ្ចុះតម្លៃ! បានអនុវត្ត។',
    'toast.checkoutDemo': 'ការទូទាត់មិនទាន់ភ្ជាប់ក្នុងកំណែសាកល្បងនេះទេ។',

    'cart.title': 'កន្ត្រករបស់អ្នក',
    'cart.close': 'បិទ',
    'cart.free': '🎉 អ្នកទទួលបានការដឹកជញ្ជូនឥតគិតថ្លៃហើយ!',
    'cart.more': 'បន្ថែម {amount} ទៀត ដើម្បីទទួលបានការដឹកជញ្ជូនឥតគិតថ្លៃ',
    'cart.promo': 'ប្រើកូដបញ្ចុះតម្លៃ 15% សម្រាប់ការបញ្ជាទិញលើកដំបូង',
    'cart.subtotal': 'សរុបរង',
    'cart.autoship': 'ការសន្សំពីការដឹកជញ្ជូនស្វ័យប្រវត្តិ',
    'cart.promoRow': 'បញ្ចុះតម្លៃ 15% លើការបញ្ជាទិញដំបូង',
    'cart.shipping': 'ការដឹកជញ្ជូន',
    'cart.freeShip': 'ឥតគិតថ្លៃ',
    'cart.total': 'សរុប',
    'cart.checkout': 'ទូទាត់ប្រាក់',
    'cart.clear': 'សម្អាតកន្ត្រក',
    'cart.empty': 'កន្ត្រករបស់អ្នកទទេ។',
    'cart.remove': 'ដកចេញ',

    'modal.title': 'បញ្ចុះតម្លៃ 15% លើការបញ្ជាទិញលើកដំបូង',
    'modal.text': 'ដោះសោការបញ្ចុះតម្លៃស្វាគមន៍ លើស្វាយចន្ទី Kampot Harvest Co. ណាមួយ។',
    'modal.unlock': 'ដោះសោការបញ្ចុះតម្លៃ',
    'modal.no': 'ទេ អរគុណ',

    // product / bundle text (English text is the key)
    'Artisan Roasted Cashews': 'ស្វាយចន្ទីអាំងសិប្បកម្ម',
    'Honey Butter': 'ទឹកឃ្មុំប៊ឺ',
    'Chili Lime': 'ម្ទេសក្រូចឆ្មា',
    '100g Pouch': 'ថង់ 100ក្រាម',
    '250g Jar': 'ដប 250ក្រាម',
    'Glazed in golden wildflower honey and creamy cultured butter.': 'ស្រោបដោយទឹកឃ្មុំផ្កាព្រៃពណ៌មាស និងប៊ឺក្រែមរលោង។',
    'Tossed with sun-ripened red chili and fresh lime zest.': 'ច្របល់ជាមួយម្ទេសក្រហមទុំថ្ងៃ និងសំបកក្រូចឆ្មាស្រស់។',
    'Signature jar of jumbo cashews in rich Honey Butter glaze.': 'ដបស្លាកសញ្ញានៃស្វាយចន្ទីគ្រាប់ធំ ស្រោបដោយទឹកឃ្មុំប៊ឺសម្បូរបែប។',
    'Seasoned with fiery red chili and bright citrus lime.': 'ប្រឡាក់គ្រឿងទេសម្ទេសក្រហមហឹរ និងក្រូចឆ្មាស្រស់ថ្លា។',
    'The Complete Collection': 'កញ្ចប់ពេញលេញ',
    'Artisan 250g Jar Duo': 'កញ្ចប់ដប 250ក្រាម ពីររសជាតិ',
    'Artisan 100g Pouch Duo': 'កញ្ចប់ថង់ 100ក្រាម ពីររសជាតិ',
    'Save 25% on all 4: Honey Butter and Chili Lime in 250g Jar and 100g Pouch.': 'សន្សំ 25% លើទាំង 4៖ ទឹកឃ្មុំប៊ឺ និងម្ទេសក្រូចឆ្មា ក្នុងដប 250ក្រាម និងថង់ 100ក្រាម។',
    'Both signature 250g jars, Honey Butter and Chili Lime, sealed for peak crunch.': 'ដបស្លាកសញ្ញា 250ក្រាម ទាំងពីរ គឺទឹកឃ្មុំប៊ឺ និងម្ទេសក្រូចឆ្មា បិទជិតដើម្បីរក្សាភាពស្រួយ។',
    'Both resealable 100g pouches, made for snacking, travel, and gifting.': 'ថង់ 100ក្រាម ទាំងពីរដែលបិទជិតឡើងវិញបាន សមស្របសម្រាប់ញ៉ាំលេង ធ្វើដំណើរ និងជាកាដូ។'
  },

  zh: {
    'meta.title': 'Kampot Harvest Co. | 贡布的骄傲，烘焙至臻完美。',
    'meta.desc': '蜂蜜黄油与辣椒青柠口味的手工烘焙腰果。',
    'skip': '跳到主要内容',
    'lang.label': '语言',

    'nav.shop': '选购',
    'nav.bundles': '优惠套装',
    'nav.way': '贡布之道',
    'nav.offer': '首单立减15%',
    'nav.bag': '购物袋',
    'nav.bagLabel': '打开购物袋',

    'hero.l1': '贡布的骄傲，',
    'hero.l2': '烘焙至臻完美。',
    'hero.text': '精选柬埔寨腰果，小批量慢火烘焙，拌入野生森林蜂蜜、香浓搅拌奶油，以及日晒贡布朝天椒。',
    'hero.cta': '去选购',
    'hero.alt': 'Kampot Harvest 腰果系列',

    'stat.fat': '更低脂',
    'stat.double': '双倍',
    'stat.protein': '蛋白质',
    'stat.natural': '天然',
    'stat.calories': '热量',

    'offer.pill': '★ 限量批次 · 贡布现烘 ★',
    'offer.title': '立减25%',
    'offer.sub': '套装优惠，不容错过',
    'offer.text': '手工烘焙腰果立省25%：蜂蜜黄油味与辣椒青柠味，250克罐装（$20）及100克袋装（$10）',
    'offer.claim': '领取优惠',

    'btn.add': '加入购物袋',
    'bundle.variant': '25%折扣套装 + 赠送勺子与食谱',

    'feat.1.t': '纯正坚果\n精制而成',
    'feat.1.d': '选用优质贡布烘焙腰果，不含任何填充物或防腐剂。',
    'feat.2.t': '慢火\n烘焙',
    'feat.2.d': '慢火干烤，锁住天然香气与浓郁奶香脆感。',
    'feat.3.t': '不添加\n精制糖',
    'feat.3.d': '仅以纯净野花蜜或天然柑橘调味裹釉。',
    'feat.4.t': '无人工\n香精',
    'feat.4.d': '您尝到的，是100%纯正的贡布腰果。',
    'feat.5.t': '双倍\n蛋白质',
    'feat.5.d': '每份都含有纯净植物蛋白与有益心脏健康的矿物质。',

    'footer.p1': '以柬埔寨单一产地腰果小批量精制。可选便携可重复密封袋装，或可重复使用的玻璃罐装，挑选您最爱的口味。',
    'footer.p2': '贡布的骄傲，烘焙至臻完美。从第一口，尝出不同。',

    'toast.view': '查看购物袋',
    'toast.added': '已加入购物袋 — {name}',
    'toast.unlocked': '折扣已解锁并应用！',
    'toast.checkoutDemo': '此演示版暂未接入结账功能。',

    'cart.title': '我的购物袋',
    'cart.close': '关闭',
    'cart.free': '🎉 已解锁免运费！',
    'cart.more': '再买 {amount} 即可免运费',
    'cart.promo': '使用首单15%优惠码',
    'cart.subtotal': '小计',
    'cart.autoship': '自动配送节省',
    'cart.promoRow': '首单立减15%',
    'cart.shipping': '运费',
    'cart.freeShip': '免费',
    'cart.total': '合计',
    'cart.checkout': '结账',
    'cart.clear': '清空购物袋',
    'cart.empty': '您的购物袋是空的。',
    'cart.remove': '移除',

    'modal.title': '首单立减15%',
    'modal.text': '解锁新客欢迎折扣，适用于 Kampot Harvest Co. 任意腰果产品。',
    'modal.unlock': '解锁折扣',
    'modal.no': '不用了',

    // product / bundle text (English text is the key)
    'Artisan Roasted Cashews': '手工烘焙腰果',
    'Honey Butter': '蜂蜜黄油',
    'Chili Lime': '辣椒青柠',
    '100g Pouch': '100克袋装',
    '250g Jar': '250克罐装',
    'Glazed in golden wildflower honey and creamy cultured butter.': '裹上金黄野花蜜与香滑发酵黄油。',
    'Tossed with sun-ripened red chili and fresh lime zest.': '拌入日晒红辣椒与新鲜青柠皮屑。',
    'Signature jar of jumbo cashews in rich Honey Butter glaze.': '招牌罐装特大腰果，裹以浓郁蜂蜜黄油糖衣。',
    'Seasoned with fiery red chili and bright citrus lime.': '以火辣红辣椒与清爽青柠调味。',
    'The Complete Collection': '全系列套装',
    'Artisan 250g Jar Duo': '手工250克罐装双拼',
    'Artisan 100g Pouch Duo': '手工100克袋装双拼',
    'Save 25% on all 4: Honey Butter and Chili Lime in 250g Jar and 100g Pouch.': '4款全选立省25%：蜂蜜黄油与辣椒青柠，250克罐装及100克袋装。',
    'Both signature 250g jars, Honey Butter and Chili Lime, sealed for peak crunch.': '两款招牌250克罐装——蜂蜜黄油与辣椒青柠，密封保鲜，酥脆如初。',
    'Both resealable 100g pouches, made for snacking, travel, and gifting.': '两款可重复密封的100克袋装，适合日常零食、旅行携带与送礼。'
  }
};

// ---------------------------------------------------------------
// Language state + helpers
// ---------------------------------------------------------------
const DEFAULT_LANG = 'en';
const HTML_LANG = {en: 'en', km: 'km', zh: 'zh-CN'};
let currentLang = DEFAULT_LANG;

try {
  const saved = localStorage.getItem('lang');
  if (saved && I18N[saved]) currentLang = saved;
} catch (e) { /* storage blocked: stay on default */ }

// t('nav.shop')  ·  t('toast.added', {name: 'Cashews'})  ·  t('Honey Butter')
function t(key, vars) {
  let s = (I18N[currentLang] && I18N[currentLang][key]);
  if (s === undefined) s = I18N[DEFAULT_LANG][key];
  if (s === undefined) s = key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

// Updates everything that is written directly in index.html
function translateStatic() {
  document.documentElement.lang = HTML_LANG[currentLang];
  document.title = t('meta.title');
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = t('meta.desc');

  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  document.querySelectorAll('.lang button').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === currentLang));
  });
}

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch (e) {}
  translateStatic();
  renderAll();            // defined in script.js: rebuilds cards, stats, cart
}