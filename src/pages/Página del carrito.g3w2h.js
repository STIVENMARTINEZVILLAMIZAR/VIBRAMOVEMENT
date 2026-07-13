import { ROUTES } from 'public/siteData';
import { addClass, navigate, onClick } from 'public/wixHelpers';

$w.onReady(function () {
  addClass('cartPage', 'vm-section-dark');
  onClick('btnSeguirComprandoCart', () => navigate(ROUTES.tienda));
});
