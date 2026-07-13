import { ROUTES } from 'public/siteData';
import { addClass, navigate, onClick, setText } from 'public/wixHelpers';

$w.onReady(function () {
  setText('pageTitle', 'Calendario de Reservas');
  addClass('pageTitle', 'vm-section-title');
  onClick('btnVolverReserva', () => navigate(ROUTES.reserva));
});
