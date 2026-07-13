import { ROUTES } from 'public/siteData';
import { addClass, navigate, onClick, setText } from 'public/wixHelpers';

$w.onReady(function () {
  addClass('cartBox', 'vm-card');
  onClick('btnSeguirComprando', () => navigate(ROUTES.tienda));
  onClick('btnIrCheckout', () => navigate('/página-de-pago'));
});
