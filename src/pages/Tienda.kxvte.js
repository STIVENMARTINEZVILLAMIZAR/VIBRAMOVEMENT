import { TIENDA } from 'public/elementMap';
import { ROUTES, STORE } from 'public/siteData';
import {
  addClass,
  formatPrice,
  initRevealOnScroll,
  navigate,
  onClick,
  setText,
  setupRepeater,
} from 'public/wixHelpers';

$w.onReady(function () {
  initHero();
  initProducts();
  initRevealOnScroll([TIENDA.productsSection]);
});

function initHero() {
  setText(TIENDA.heroTitle, `${STORE.label}\n${STORE.title}`);
  addClass(TIENDA.heroTitle, 'vm-section-title');
  addClass(TIENDA.heroSection, 'vm-section-dark');
}

function initProducts() {
  setText('text5', STORE.cta);
  addClass('text5', 'vm-btn-ghost');
  onClick('text5', () => navigate(ROUTES.contacto));

  setupRepeater(TIENDA.productsRepeater, STORE.products, ($item, item) => {
    setText('text4', item.badge, $item);
    setText('collapsibleText1', `${item.category}\n\n${item.name}\n\n${formatPrice(item.price, item.currency)}`, $item);
    addClass('box3', 'vm-card-product', $item);
    addClass('text4', 'vm-badge', $item);

    try {
      $item('#box3').onClick(() => navigate(ROUTES.tienda));
    } catch (_) {}
  });

  setupRepeater(TIENDA.slideshowRepeater, STORE.products, ($item, item) => {
    setText('text6', item.name, $item);
    setText('text7', formatPrice(item.price), $item);
    addClass('text7', 'vm-stat-number', $item);
  });

  addClass(TIENDA.slideshowCta, 'vm-btn-primary');
  onClick(TIENDA.slideshowCta, () => navigate(ROUTES.contacto));
}

function setText(id, value, $item) {
  try {
    const el = $item ? $item(`#${id}`) : $w(`#${id}`);
    if (el && 'text' in el) el.text = value;
  } catch (_) {}
}

function addClass(id, className, $item) {
  try {
    const el = $item ? $item(`#${id}`) : $w(`#${id}`);
    if (el?.customClassList) el.customClassList.add(className);
  } catch (_) {}
}
