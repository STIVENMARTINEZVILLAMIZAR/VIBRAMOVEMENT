import { SOBRE } from 'public/elementMap';
import { ABOUT, FOUNDER, IMPACT_STATS, ROUTES } from 'public/siteData';
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
  initAbout();
  initImpact();
  initCta();
  initRevealOnScroll([SOBRE.aboutSection, SOBRE.teamSection]);
});

function initHero() {
  setText(SOBRE.heroTitle, `${ABOUT.label}\n${ABOUT.title}`);
  setText('text4', ABOUT.text1);
  addClass(SOBRE.heroTitle, 'vm-section-title');
  addClass(SOBRE.heroSection, 'vm-section-dark');
  addClass(SOBRE.heroCta, 'vm-btn-primary');
  onClick(SOBRE.heroCta, () => navigate(ROUTES.reserva));
}

function initAbout() {
  setText(SOBRE.aboutTitle, ABOUT.title);
  setText(SOBRE.aboutSubtitle, ABOUT.text2);
  addClass(SOBRE.aboutTitle, 'vm-section-title');
  addClass(SOBRE.aboutSubtitle, 'vm-body');

  setupRepeater(SOBRE.aboutRepeater, ABOUT.features, ($item, item) => {
    setText('text8', `${item.icon} ${item.text}`, $item);
    addClass('box7', 'vm-feature-pill', $item);
  });

  setText('text7', FOUNDER.bio);
  setText('text9', FOUNDER.quote);
  addClass('text9', 'vm-body');
}

function initImpact() {
  setupRepeater('repeater1', IMPACT_STATS, ($item, item) => {
    setText('text8', item.value, $item);
    setText('text9', `${item.label} — ${item.sub}`, $item);
    addClass('box7', 'vm-card', $item);
    addClass('text8', 'vm-stat-number', $item);
  });
}

function initCta() {
  setText(SOBRE.ctaTitle, FOUNDER.motto);
  addClass(SOBRE.ctaTitle, 'vm-founder-quote');
  addClass(SOBRE.ctaBtn, 'vm-btn-primary');
  onClick(SOBRE.ctaBtn, () => navigate(ROUTES.programas));
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
