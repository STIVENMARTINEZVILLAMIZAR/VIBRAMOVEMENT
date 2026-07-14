import {
  INICIO,
  INICIO_CLASSES,
  INICIO_TEXTS,
  USE_CODE_TEXT,
} from 'public/elementMap';
import {
  HERO_STATS,
  IMPACT_STATS,
  ROUTES,
  SERVICES,
  STORE,
  TESTIMONIALS,
} from 'public/siteData';
import {
  addClass,
  animateCounter,
  applyClasses,
  applyTexts,
  formatPrice,
  initRevealOnScroll,
  navigate,
  onClick,
  scrollTo,
  setText,
  setupRepeater,
  stars,
} from 'public/wixHelpers';

$w.onReady(function () {
  if (USE_CODE_TEXT) {
    applyTexts(INICIO_TEXTS);
  }
  applyClasses(INICIO_CLASSES);

  initButtons();
  initRepeaters();
  initRevealOnScroll([
    INICIO.aboutSection,
    INICIO.servicesSection,
    INICIO.impactSection,
    INICIO.certSection,
  ]);
});

function initButtons() {
  onClick(INICIO.heroCtaPrimary, () => navigate(ROUTES.reserva));
  onClick(INICIO.btnVerServicios, () => scrollTo(INICIO.servicesSection));
  onClick(INICIO.btnConoceHistoria, () => navigate(ROUTES.sobreNosotros));
  onClick(INICIO.servicesCta, () => navigate(ROUTES.programas));
  onClick(INICIO.certCta, () => navigate(ROUTES.tienda));
}

function initRepeaters() {
  // Stats (+15, +2000, 98%)
  setupRepeater(INICIO.statsRepeater, HERO_STATS, ($item, item, index) => {
    const ids = ['text8', 'text9', 'text10'];
    const id = ids[index];
    if (!id) return;
    animateCounter(id, item.value, {
      prefix: item.prefix || '',
      suffix: item.suffix || '',
    });
    addClass(id, 'vm-stat-number', $item);
  });

  // 3 programas de servicio
  setupRepeater(INICIO.servicesRepeater, SERVICES.items, ($item, item) => {
    setText('text13', item.number, $item);
    setText('text14', `${item.category}\n${item.title}\n${item.description}`, $item);
    addClass('box10', 'vm-card-service', $item);
    addClass('text14', 'vm-body', $item);
    try {
      $item('#box10').onClick(() => navigate(`${ROUTES.programas}?programa=${item.id}`));
    } catch (_) {}
  });

  // Stats de impacto (2010, +2000, 3, 98%)
  setupRepeater(INICIO.impactRepeater, IMPACT_STATS, ($item, item) => {
    setText('text17', item.value, $item);
    setText('text18', `${item.label}\n${item.sub}`, $item);
    addClass('box15', 'vm-card', $item);
    addClass('text17', 'vm-stat-number', $item);
  });

  // Testimonio activo (primer item)
  const t = TESTIMONIALS.items[0];
  setText(
    'text20',
    `${TESTIMONIALS.title}\n\n"${t.quote}"\n— ${t.name}, ${t.age}\n${stars(t.rating)}`
  );
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
