import { MASTER } from 'public/elementMap';
import { ROUTES } from 'public/siteData';
import { addClass, initStickyHeader, navigate, onClick } from 'public/wixHelpers';

$w.onReady(function () {
  initGlobalStyles();
  initStickyHeader(MASTER.header);
  initHamburgerMenu();
});

function initGlobalStyles() {
  addClass(MASTER.header, 'vm-header');
  addClass(MASTER.footer, 'vm-footer');
}

function initHamburgerMenu() {
  onClick(MASTER.hamburgerOpen, () => {
    try {
      $w(`#${MASTER.hamburgerOverlay}`).show();
    } catch (_) {}
  });

  onClick(MASTER.hamburgerClose, () => {
    try {
      $w(`#${MASTER.hamburgerOverlay}`).hide();
    } catch (_) {}
  });
}

// El menú horizontal de Wix maneja la navegación nativamente.
// CTA de reserva: asigna button en header si existe, o usa menú.
onClick('text23', () => navigate(ROUTES.reserva));
