import { CONTACTO } from 'public/elementMap';
import { BRAND, ROUTES } from 'public/siteData';
import { addClass, navigate, onClick, setText } from 'public/wixHelpers';

$w.onReady(function () {
  initHero();
  initContactInfo();
  initStyles();
});

function initHero() {
  setText(CONTACTO.heroTitle, 'Contacto');
  setText(CONTACTO.heroSubtitle, `Escríbenos y el equipo de ${BRAND.name} te responderá pronto.`);
  setText('text5', `${BRAND.tagline}`);
  addClass(CONTACTO.heroTitle, 'vm-section-title');
  addClass(CONTACTO.heroSubtitle, 'vm-body');
  addClass(CONTACTO.heroSection, 'vm-section-dark');
}

function initContactInfo() {
  setText(CONTACTO.infoTitle, 'Información de contacto');
  setText(CONTACTO.infoText1, '📧 hola@vibramovement.com');
  setText(CONTACTO.infoText2, '📞 +54 11 0000 0000');
  setText(CONTACTO.infoText3, '🕐 Lun – Vie · 9:00 – 18:00 hs');
  addClass(CONTACTO.infoSection, 'vm-cert-box');
  onClick('text12', () => navigate(ROUTES.reserva));
}

function initStyles() {
  addClass(CONTACTO.contactForm, 'vm-card');
  addClass(CONTACTO.secondaryForm, 'vm-card');
}
