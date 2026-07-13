import { ROUTES } from 'public/siteData';
import { addClass, navigate, onClick } from 'public/wixHelpers';

$w.onReady(function () {
  addClass('servicePage', 'vm-section-dark');
  onClick('btnReservaServicio', () => navigate(ROUTES.reserva));
});
