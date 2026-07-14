/**
 * Mapa de IDs del Editor Wix + contenido en un solo lugar.
 * Si un texto no cambia: edítalo en el Editor Wix y deja USE_CODE_TEXT = false.
 */

import {
  ABOUT,
  CERTIFICADO,
  FOUNDER,
  HERO,
  SERVICES,
  STORE,
  TESTIMONIALS,
} from 'public/siteData';

/** false = textos los pones directo en el Editor Wix (más rápido para la clienta) */
export const USE_CODE_TEXT = true;

export const MASTER = {
  header: 'header1',
  footer: 'footer1',
  menu: 'horizontalMenu1',
  hamburgerOpen: 'hamburgerOpenButton1',
  hamburgerClose: 'hamburgerCloseButton1',
  hamburgerOverlay: 'hamburgerOverlay1',
  logo: 'vectorImage2',
  cart: 'shoppingCartIcon1',
};

export const INICIO = {
  // section10 — Hero
  heroSection: 'section10',
  heroTitle: 'text22',
  heroSubtitle: 'text21',
  heroCtaPrimary: 'button5',
  heroImage: 'imageX4',

  // section5 — Stats repeater
  statsSection: 'section5',
  statsRepeater: 'repeater1',

  // section9 — Certificado YMCA
  certSection: 'section9',
  certText: 'text19',
  certCta: 'button3',
  certImage: 'imageX3',

  // section4 — Sobre nosotros
  aboutSection: 'section4',
  aboutLabel: 'text3',
  aboutTitle: 'text4',
  aboutText1: 'text5',
  aboutText2: 'text6',
  aboutExtra: 'text7',

  // section6 — Servicios repeater
  servicesSection: 'section6',
  servicesRepeater: 'repeater2',
  servicesLabel: 'text11',
  servicesTitle: 'text12',
  servicesCta: 'button1',
  servicesImage: 'imageX2',

  // section7 — Impacto / fundadora repeater
  impactSection: 'section7',
  impactRepeater: 'repeater3',
  impactLabel: 'text15',
  impactTitle: 'text16',
  impactCta: 'button2',

  // section8 — Widget servicios Wix
  servicesWidgetSection: 'section8',
  serviceListWidget: 'serviceListWidget1',

  // Botones adicionales
  btnVerServicios: 'button4',
  btnConoceHistoria: 'button4',
};

/**
 * Todos los textos de Inicio en UN solo objeto.
 * Formato: 'idDelElemento': 'texto a mostrar'
 * Solo ajusta el ID si cambia en el editor — no toques Inicio.c1dmp.js
 */
export const INICIO_TEXTS = {
  text22: HERO.title,
  text21: HERO.subtitle,
  button5: HERO.ctaPrimary,
  text19: `${CERTIFICADO.icon} ${CERTIFICADO.title} — ${CERTIFICADO.subtitle}. ${CERTIFICADO.description}`,
  text3: ABOUT.label,
  text4: ABOUT.title,
  text5: ABOUT.text1,
  text6: ABOUT.text2,
  text7: ABOUT.features.map((f) => `${f.icon} ${f.text}`).join('  ·  '),
  text11: SERVICES.label,
  text12: SERVICES.title,
  text15: 'Nuestro impacto',
  text16: FOUNDER.title,
  text20: `${FOUNDER.label}: ${FOUNDER.title}`,
  button3: STORE.cta,
};

/** Clases CSS por elemento — diseño Figma */
export const INICIO_CLASSES = {
  section10: 'vm-hero',
  text22: 'vm-hero-title',
  text21: 'vm-body',
  button5: 'vm-btn-primary',
  section4: 'vm-section-alt',
  text3: 'vm-section-label',
  text4: 'vm-section-title',
  text5: 'vm-body',
  text6: 'vm-body',
  section6: 'vm-section-dark',
  text11: 'vm-section-label',
  text12: 'vm-section-title',
  button1: 'vm-btn-primary',
  section7: 'vm-section-alt',
  text15: 'vm-section-label',
  text16: 'vm-section-title',
  button2: 'vm-founder-quote',
  section9: 'vm-cert-box',
  button4: 'vm-btn-ghost',
  section8: 'vm-section-dark',
  button3: 'vm-btn-ghost',
};

export const SOBRE = {
  heroSection: 'section4',
  heroTitle: 'text3',
  heroCta: 'button1',
  heroImage: 'imageX1',
  aboutSection: 'section6',
  aboutRepeater: 'repeater1',
  aboutTitle: 'text10',
  aboutSubtitle: 'text11',
  teamSection: 'section7',
  ctaSection: 'section5',
  ctaTitle: 'text6',
  ctaBtn: 'button2',
};

export const PROGRAMAS = {
  heroSection: 'section4',
  heroTitle: 'text3',
  heroSubtitle: 'text4',
  heroImage: 'imageX1',
  programsRepeater: 'repeater1',
  programsSection: 'section5',
  programsTitle: 'text9',
  programsSubtitle: 'text10',
  programsCta: 'button1',
  galleryRepeater: 'repeater2',
  gallerySection: 'section6',
  servicesRepeater: 'repeater3',
  servicesSection: 'section7',
  slideshowRepeater: 'repeater4',
  slideshowSection: 'section8',
  contactForm: 'form1',
};

export const TIENDA = {
  heroSection: 'section4',
  heroTitle: 'text3',
  productsRepeater: 'repeater1',
  productsSection: 'section5',
  faqWidget: 'faqWidget1',
  slideshowRepeater: 'repeater2',
  slideshowSection: 'section6',
  slideshowCta: 'button1',
};

export const CONTACTO = {
  heroSection: 'section4',
  heroTitle: 'text3',
  heroSubtitle: 'text4',
  heroImage: 'imageX1',
  contactForm: 'form1',
  infoSection: 'section5',
  infoTitle: 'text11',
  infoText1: 'text10',
  infoText2: 'text9',
  infoText3: 'text8',
  secondaryForm: 'form2',
};
