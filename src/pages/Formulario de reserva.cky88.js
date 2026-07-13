import { ROUTES } from 'public/siteData';
import { addClass, navigate, onClick } from 'public/wixHelpers';

$w.onReady(function () {
  addClass('bookingForm', 'vm-card');
  addClass('btnConfirmarReserva', 'vm-btn-primary');
  onClick('btnVolverFormulario', () => navigate(ROUTES.reserva));
});
