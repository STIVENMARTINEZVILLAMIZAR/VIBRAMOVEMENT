import { BRAND, ROUTES } from 'public/siteData';
import { addClass, navigate, onClick, setText } from 'public/wixHelpers';

$w.onReady(function () {
  initPageHeader();
  initBookingCta();
});

function initPageHeader() {
  setText('pageTitle', 'Reserva Online');
  setText(
    'pageSubtitle',
    `Agenda tu evaluación inicial o sesión con ${BRAND.name}. Presencial u online.`
  );
  addClass('pageTitle', 'vm-section-title');
  addClass('pageSubtitle', 'vm-body');
  addClass('bookingWidget', 'vm-card');
}

function initBookingCta() {
  onClick('btnVerProgramas', () => navigate(ROUTES.programas));
  onClick('btnContactoReserva', () => navigate(ROUTES.contacto));
}
