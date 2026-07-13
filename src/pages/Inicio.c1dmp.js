import { INICIO } from 'public/elementMap';
import {
  ABOUT,
  CERTIFICADO,
  FOUNDER,
  HERO,
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
  formatPrice,
  initRevealOnScroll,
  navigate,
  onClick,
  scrollTo,
  setText,
  setupRepeater,
  stars,
} from 'public/wixHelpers';

let activeTestimonial = 0;

$w.onReady(function () {
  initHero();
  initHeroStats();
  initCertificado();
  initAbout();
  initServices();
  initImpactStats();
  initFounderTexts();
  initTestimonials();
  initStorePreview();
  initRevealOnScroll([
    INICIO.aboutSection,
    INICIO.servicesSection,
    INICIO.impactSection,
    INICIO.certSection,
  ]);
});

/* ── HERO (section10) ── */
function initHero() {
  setText(INICIO.heroTitle, HERO.title);
  setText(INICIO.heroSubtitle, HERO.subtitle);
  setText(INICIO.heroCtaPrimary, HERO.ctaPrimary);

  addClass(INICIO.heroSection, 'vm-hero');
  addClass(INICIO.heroTitle, 'vm-hero-title');
  addClass(INICIO.heroSubtitle, 'vm-body');
  addClass(INICIO.heroCtaPrimary, 'vm-btn-primary');

  onClick(INICIO.heroCtaPrimary, () => navigate(ROUTES.reserva));
  onClick(INICIO.btnVerServicios, () => scrollTo(INICIO.servicesSection));
}

/* ── STATS (repeater1 / section5) ── */
function initHeroStats() {
  addClass(INICIO.statsSection, 'vm-section-alt');

  setupRepeater(INICIO.statsRepeater, HERO_STATS, ($item, item, index) => {
    const valueId = `statValue${index}`;
    const labelId = `statLabel${index}`;
    setText(valueId, `${item.prefix || ''}${item.value}${item.suffix || ''}`, $item);
    setText(labelId, item.label, $item);
    addClass(valueId, 'vm-stat-number', $item);

    // Si el repeater tiene text8/text9/text10 como valores fijos:
    try {
      const ids = ['text8', 'text9', 'text10'];
      if (ids[index]) {
        animateCounter(ids[index], item.value, {
          prefix: item.prefix || '',
          suffix: item.suffix || '',
        });
        addClass(ids[index], 'vm-stat-number', $item);
      }
    } catch (_) {}
  });
}

/* ── CERTIFICADO YMCA (section9) ── */
function initCertificado() {
  setText(INICIO.certText, `${CERTIFICADO.icon} ${CERTIFICADO.title} — ${CERTIFICADO.subtitle}. ${CERTIFICADO.description}`);
  addClass(INICIO.certSection, 'vm-cert-box');
  addClass(INICIO.certCta, 'vm-btn-ghost');
}

/* ── SOBRE NOSOTROS (section4) ── */
function initAbout() {
  setText(INICIO.aboutLabel, ABOUT.label);
  setText(INICIO.aboutTitle, ABOUT.title);
  setText(INICIO.aboutText1, ABOUT.text1);
  setText(INICIO.aboutText2, ABOUT.text2);
  setText(INICIO.aboutExtra, ABOUT.features.map((f) => `${f.icon} ${f.text}`).join('  ·  '));

  addClass(INICIO.aboutSection, 'vm-section-alt');
  addClass(INICIO.aboutLabel, 'vm-section-label');
  addClass(INICIO.aboutTitle, 'vm-section-title');
  addClass(INICIO.aboutText1, 'vm-body');
  addClass(INICIO.aboutText2, 'vm-body');
  addClass(INICIO.btnConoceHistoria, 'vm-btn-ghost');

  onClick(INICIO.btnConoceHistoria, () => navigate(ROUTES.sobreNosotros));
}

/* ── SERVICIOS (repeater2 / section6) ── */
function initServices() {
  setText(INICIO.servicesLabel, SERVICES.label);
  setText(INICIO.servicesTitle, SERVICES.title);

  addClass(INICIO.servicesSection, 'vm-section-dark');
  addClass(INICIO.servicesLabel, 'vm-section-label');
  addClass(INICIO.servicesTitle, 'vm-section-title');
  addClass(INICIO.servicesCta, 'vm-btn-primary');

  setupRepeater(INICIO.servicesRepeater, SERVICES.items, ($item, item) => {
    setText('text13', item.number, $item);
    setText('text14', `${item.category}\n${item.title}\n${item.description}`, $item);
    addClass('box10', 'vm-card-service', $item);
    addClass('text14', 'vm-body', $item);

    try {
      $item('#box10').onClick(() => navigate(`${ROUTES.programas}?programa=${item.id}`));
    } catch (_) {}
  });

  onClick(INICIO.servicesCta, () => navigate(ROUTES.programas));
}

/* ── IMPACTO (repeater3 / section7) ── */
function initImpactStats() {
  setText(INICIO.impactLabel, 'Nuestro impacto');
  setText(INICIO.impactTitle, IMPACT_STATS[0].label);

  addClass(INICIO.impactSection, 'vm-section-alt');
  addClass(INICIO.impactLabel, 'vm-section-label');
  addClass(INICIO.impactTitle, 'vm-section-title');

  setupRepeater(INICIO.impactRepeater, IMPACT_STATS, ($item, item) => {
    setText('text17', item.value, $item);
    setText('text18', `${item.label}\n${item.sub}`, $item);
    addClass('box15', 'vm-card', $item);
    addClass('text17', 'vm-stat-number', $item);
  });
}

/* ── FUNDADORA (textos en section7/section6) ── */
function initFounderTexts() {
  setText('text20', `${FOUNDER.label}: ${FOUNDER.title}`);
  setText(INICIO.impactCta, FOUNDER.motto);
  addClass(INICIO.impactCta, 'vm-founder-quote');
}

/* ── TESTIMONIOS — usa text19/text20 de section9 ── */
function initTestimonials() {
  const active = TESTIMONIALS.items[activeTestimonial];
  setText('text20', `${TESTIMONIALS.title}\n\n"${active.quote}"\n— ${active.name}, ${active.age}\n${stars(active.rating)}`);
  addClass(INICIO.certSection, 'vm-testimonial-quote');
}

/* ── TIENDA PREVIEW — section8 widget + navegación ── */
function initStorePreview() {
  setText(INICIO.certCta, STORE.cta);
  addClass(INICIO.servicesWidgetSection, 'vm-section-dark');
  onClick(INICIO.certCta, () => navigate(ROUTES.tienda));

  // Productos preview en repeater2 items si están disponibles
  try {
    $w(`#${INICIO.servicesRepeater}`).onItemReady(($item, _data, index) => {
      const product = STORE.products[index];
      if (!product) return;
      setText('text13', product.badge, $item);
      setText('text14', `${product.name}\n${formatPrice(product.price)}`, $item);
    });
  } catch (_) {}
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
