import { PROGRAMAS } from 'public/elementMap';
import { ROUTES, SERVICES } from 'public/siteData';
import wixLocation from 'wix-location';
import {
  addClass,
  initRevealOnScroll,
  navigate,
  onClick,
  setText,
  setupRepeater,
} from 'public/wixHelpers';

$w.onReady(function () {
  initHero();
  initPrograms();
  highlightActiveProgram();
  initRevealOnScroll([PROGRAMAS.programsSection, PROGRAMAS.servicesSection]);
});

function initHero() {
  setText(PROGRAMAS.heroTitle, SERVICES.label);
  setText(PROGRAMAS.heroSubtitle, SERVICES.title);
  setText('text5', SERVICES.subtitle);
  addClass(PROGRAMAS.heroTitle, 'vm-section-label');
  addClass(PROGRAMAS.heroSubtitle, 'vm-section-title');
  addClass('text5', 'vm-body');
}

function initPrograms() {
  setText(PROGRAMAS.programsTitle, SERVICES.title);
  setText(PROGRAMAS.programsSubtitle, SERVICES.subtitle);
  addClass(PROGRAMAS.programsTitle, 'vm-section-title');
  addClass(PROGRAMAS.programsCta, 'vm-btn-primary');

  setupRepeater(PROGRAMAS.programsRepeater, SERVICES.items, ($item, item) => {
    setText('text8', item.number, $item);
    setText('collapsibleText1', `${item.category}\n\n${item.title}\n\n${item.description}`, $item);
    addClass('box4', 'vm-card-service', $item);
    addClass('text8', 'vm-service-number', $item);

    try {
      $item('#box4').onClick(() => navigate(ROUTES.reserva));
    } catch (_) {}
  });

  setupRepeater(PROGRAMAS.servicesRepeater, SERVICES.items, ($item, item) => {
    setText('text16', item.title, $item);
    setText('text15', item.description, $item);
    addClass('box14', 'vm-card', $item);
  });

  onClick(PROGRAMAS.programsCta, () => navigate(ROUTES.reserva));
  onClick('button2', () => navigate(ROUTES.contacto));
  onClick('button3', () => navigate(ROUTES.reserva));
  onClick('button4', () => navigate(ROUTES.tienda));
}

function highlightActiveProgram() {
  const programaId = wixLocation.query?.programa;
  if (!programaId) return;
  const program = SERVICES.items.find((p) => p.id === programaId);
  if (program) {
    setText('text6', `Programa seleccionado: ${program.title}`);
    addClass('text6', 'vm-badge');
  }
}

function setText(id, value, $item) {
  try {
    const el = $item ? $item(`#${id}`) : $w(`#${id}`);
    if (el && 'text' in el) el.text = value;
  } catch (_) {}
}

function addClass(id, className, $item) {
  try {
    const el = $item ? $item(`#${id}`) : $w(`#${id}`);
    if (el?.customClassList) el.customClassList.add(className);
  } catch (_) {}
}
