import wixLocation from 'wix-location-frontend';
import wixWindowFrontend from 'wix-window-frontend';

/** Obtiene un elemento de forma segura (no rompe si falta en el editor) */
export function getEl(id) {
  try {
    return $w(`#${id}`);
  } catch (_) {
    return null;
  }
}

/** Asigna texto si el elemento existe */
export function setText(id, value) {
  const el = getEl(id);
  if (el && 'text' in el) {
    el.text = value;
  }
}

/** Aplica muchos textos de una vez: { text22: 'Hola', button5: 'Click' } */
export function applyTexts(textMap) {
  Object.entries(textMap).forEach(([id, value]) => {
    if (value != null && value !== '') setText(id, value);
  });
}

/** Aplica clases CSS a muchos elementos de una vez */
export function applyClasses(classMap) {
  Object.entries(classMap).forEach(([id, className]) => addClass(id, className));
}

/** Asigna clase CSS custom via Velo */
export function addClass(id, className) {
  const el = getEl(id);
  if (el && el.customClassList) {
    el.customClassList.add(className);
  }
}

export function removeClass(id, className) {
  const el = getEl(id);
  if (el && el.customClassList) {
    el.customClassList.remove(className);
  }
}

/** Click handler seguro */
export function onClick(id, handler) {
  const el = getEl(id);
  if (el && typeof el.onClick === 'function') {
    el.onClick(handler);
  }
}

/** Navegación interna */
export function navigate(path) {
  wixLocation.to(path);
}

/** Scroll suave a sección por anchor (#id de elemento en la página) */
export function scrollTo(id) {
  const el = getEl(id);
  if (el && typeof el.scrollTo === 'function') {
    el.scrollTo();
  }
}

/** Animación de contador numérico */
export function animateCounter(id, target, options = {}) {
  const el = getEl(id);
  if (!el) return;

  const { prefix = '', suffix = '', duration = 1800 } = options;
  const steps = 60;
  const interval = duration / steps;
  let step = 0;

  const timer = setInterval(() => {
    step += 1;
    const progress = step / steps;
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.text = `${prefix}${current.toLocaleString('es-ES')}${suffix}`;
    if (step >= steps) clearInterval(timer);
  }, interval);
}

/** Configura un repeater con datos y mapeo de campos internos */
export function setupRepeater(repeaterId, data, itemReadyFn) {
  const repeater = getEl(repeaterId);
  if (!repeater) return;

  repeater.data = data;
  repeater.onItemReady(($item, itemData, index) => {
    itemReadyFn($item, itemData, index);
  });
}

/** Muestra/oculta elemento */
export function show(id, visible = true) {
  const el = getEl(id);
  if (!el) return;
  if (visible) {
    el.show();
  } else {
    el.hide();
  }
}

/** Lee posición Y del scroll (Wix Studio no tiene wixWindow.onScroll) */
function getScrollY() {
  return wixWindowFrontend.getBoundingRect().then((info) => {
    return info?.scroll?.y ?? info?.scrollTop ?? 0;
  });
}

/** Simula onScroll con polling — API compatible con Wix Studio */
function onScroll(handler) {
  let lastY = -1;
  setInterval(() => {
    getScrollY()
      .then((scrollY) => {
        if (scrollY !== lastY) {
          lastY = scrollY;
          handler({ scrollY });
        }
      })
      .catch(() => {});
  }, 250);
}

/** Header sticky al hacer scroll */
export function initStickyHeader(headerId = 'header') {
  const header = getEl(headerId);
  if (!header) return;

  onScroll(({ scrollY }) => {
    if (scrollY > 60) {
      header.customClassList?.add('vm-header-scrolled');
    } else {
      header.customClassList?.remove('vm-header-scrolled');
    }
  });
}

/** Fade-in progresivo al cargar */
export function initRevealOnScroll(elementIds) {
  elementIds.forEach((id) => addClass(id, 'vm-fade-in'));

  const reveal = () => {
    elementIds.forEach((id) => addClass(id, 'vm-fade-in-visible'));
  };

  setTimeout(reveal, 200);
  onScroll(reveal);
}

/** Formatea precio */
export function formatPrice(amount, currency = '$') {
  return `${currency}${amount}`;
}

/** Genera estrellas ★ */
export function stars(count) {
  return '★'.repeat(count);
}
