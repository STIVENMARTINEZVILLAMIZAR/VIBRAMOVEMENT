import { ROUTES } from 'public/siteData';
import { addClass, navigate, onClick, setText } from 'public/wixHelpers';

$w.onReady(function () {
  setText('thankYouTitle', '¡Gracias por confiar en VibraMovement!');
  setText('thankYouSubtitle', 'Tu pedido fue recibido. Te contactaremos pronto.');
  addClass('thankYouTitle', 'vm-section-title');
  addClass('btnVolverInicio', 'vm-btn-primary');
  onClick('btnVolverInicio', () => navigate(ROUTES.inicio));
});
