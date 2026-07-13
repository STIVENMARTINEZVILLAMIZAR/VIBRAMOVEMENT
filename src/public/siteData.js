/** Contenido centralizado — réplica del mockup Figma Make */

export const BRAND = {
  name: 'VibraMovement',
  tagline: 'Fitness Inclusivo · Desde 2010',
  founder: 'Alejandra Germano',
  yearFounded: 2010,
};

export const ROUTES = {
  inicio: '/',
  programas: '/programas',
  sobreNosotros: '/sobre-nosotros',
  tienda: '/tienda',
  contacto: '/contacto',
  reserva: '/reserva-online',
};

export const HERO = {
  badge: 'Fitness Inclusivo · Desde 2010',
  title: 'El movimiento es para todos.',
  subtitle:
    'Programas adaptados para personas con capacidades diferentes, adultos mayores y quienes atraviesan recuperación física o neurológica.',
  ctaPrimary: 'Comienza hoy →',
  ctaSecondary: 'Ver servicios',
};

export const HERO_STATS = [
  { value: 15, prefix: '+', label: 'Años de experiencia' },
  { value: 2000, prefix: '+', suffix: '', label: 'Personas atendidas', format: 'number' },
  { value: 98, suffix: '%', label: 'Satisfacción' },
];

export const CERTIFICADO = {
  icon: '🏅',
  title: 'Certificado YMCA',
  subtitle: 'Programa LiveStrong',
  description: 'Entrenadores especializados en actividad física adaptada.',
  years: '+15',
  yearsLabel: 'Años',
};

export const ABOUT = {
  label: 'Sobre nosotros',
  title: 'Movimiento con propósito.',
  text1:
    'VibraMovement nació en 2010 con una convicción: el ejercicio y el bienestar no deberían tener barreras. Fundada por Alejandra Germano, creamos espacios de movimiento inclusivos donde cada persona puede alcanzar su máximo potencial.',
  text2:
    'Trabajamos con adultos mayores, personas con capacidades intelectuales y físicas diferentes, y quienes atraviesan recuperación neurológica — siempre desde el respeto y la ciencia del movimiento.',
  cta: 'Conoce nuestra historia →',
  features: [
    { icon: '♾️', text: 'Inclusión total' },
    { icon: '🏅', text: 'Certificados YMCA' },
    { icon: '🧠', text: 'Basado en evidencia' },
    { icon: '🌎', text: 'Presencial y online' },
  ],
};

export const SERVICES = {
  label: 'Servicios',
  title: 'Tres programas, una misión.',
  subtitle:
    'Especializados en actividad física adaptada, neurología del movimiento y pedagogía inclusiva.',
  items: [
    {
      id: 'capacidades-diferentes',
      number: '01',
      category: 'Entrenamiento Adaptado',
      title: 'Capacidades Diferentes',
      description:
        'Programas diseñados para personas con discapacidades intelectuales y físicas. Cada sesión respeta el ritmo y los objetivos individuales.',
      cta: 'Saber más →',
    },
    {
      id: 'adultos-mayores',
      number: '02',
      category: 'Envejecimiento Activo',
      title: 'Adultos Mayores',
      description:
        'Actividad física segura para +60 años. Mejora la fuerza, equilibrio y movilidad, reduciendo el riesgo de caídas.',
      cta: 'Saber más →',
    },
    {
      id: 'recuperacion',
      number: '03',
      category: 'Física y Neurológica',
      title: 'Recuperación F/N',
      description:
        'Acompañamiento post-lesión, ACV o Parkinson, coordinado con tu equipo médico para un abordaje integral.',
      cta: 'Saber más →',
    },
  ],
};

export const IMPACT_STATS = [
  { value: '2010', label: 'Año de fundación', sub: 'Más de 15 años de trayectoria' },
  { value: '+2,000', label: 'Personas atendidas', sub: 'En todo LATAM, presencial y online' },
  { value: '3', label: 'Líneas de servicio', sub: 'Adaptadas a cada necesidad' },
  { value: '98%', label: 'Satisfacción', sub: 'De participantes recomiendan el programa' },
];

export const FOUNDER = {
  label: 'Fundadora',
  title: 'Alejandra Germano',
  bio:
    'Con más de 15 años de trayectoria, Alejandra Germano es referente latinoamericana en fitness inclusivo. Formada con el programa LiveStrong del YMCA, creó metodologías propias para acompañar a personas en recuperación oncológica, neurológica y física.',
  quote:
    '"Cada cuerpo tiene una historia y una capacidad de transformación. Mi trabajo es ser el puente entre lo que una persona cree imposible y lo que su cuerpo puede lograr."',
  stats: [
    { value: '+15', label: 'años de experiencia' },
    { value: 'YMCA', label: 'LiveStrong certified' },
    { value: '2010', label: 'fundación' },
  ],
  motto: '"El movimiento es el ejercicio de la libertad."',
  mottoAuthor: '— Alejandra Germano',
};

export const TESTIMONIALS = {
  label: 'Testimonios',
  title: 'Lo que dicen quienes vibraron.',
  items: [
    {
      id: 'carmen',
      initials: 'CR',
      name: 'Carmen Rodríguez',
      category: 'Adultos Mayores',
      age: '68 años · Participante',
      quote:
        'Cuando llegué tenía miedo de caerme al hacer cualquier movimiento. Hoy camino 40 minutos diarios. VibraMovement me devolvió la confianza en mi propio cuerpo.',
      rating: 5,
    },
    {
      id: 'martin',
      initials: 'MS',
      name: 'Martín Suárez',
      category: 'Recuperación Neurológica',
      age: '54 años · Participante',
      quote:
        'Después de mi ACV pensé que no volvería a moverme con confianza. El equipo de VibraMovement diseñó un plan que respetó cada etapa de mi recuperación.',
      rating: 5,
    },
    {
      id: 'lucia',
      initials: 'LF',
      name: 'Lucía Fernández',
      category: 'Capacidades Diferentes',
      age: '32 años · Participante',
      quote:
        'Por primera vez encontré un espacio donde me siento vista y respetada. Cada sesión es un logro y me siento parte de una comunidad real.',
      rating: 5,
    },
    {
      id: 'roberto',
      initials: 'RM',
      name: 'Roberto Medina',
      category: 'Adultos Mayores',
      age: '71 años · Participante',
      quote:
        'A los 71 años recuperé fuerza y equilibrio que creía perdidos. Los entrenadores entienden las necesidades de quienes somos mayores.',
      rating: 5,
    },
  ],
};

export const STORE = {
  label: 'Tienda',
  title: 'Programas que transforman.',
  cta: 'Ver tienda completa →',
  products: [
    {
      id: 'programa-12-semanas',
      badge: 'Más vendido',
      category: 'Adultos Mayores',
      name: 'Programa Online 12 Semanas',
      price: 89,
      currency: '$',
    },
    {
      id: 'evaluacion-inicial',
      badge: 'Recomendado',
      category: 'Sesión 1:1',
      name: 'Evaluación Inicial + Plan',
      price: 45,
      currency: '$',
    },
    {
      id: 'membresia-grupal',
      badge: 'Popular',
      category: 'Acceso ilimitado',
      name: 'Membresía Mensual Grupal',
      price: 59,
      currency: '$',
    },
  ],
};

export const NAV_LINKS = [
  { label: 'Inicio', path: ROUTES.inicio },
  { label: 'Programas', path: ROUTES.programas },
  { label: 'Nosotros', path: ROUTES.sobreNosotros },
  { label: 'Tienda', path: ROUTES.tienda },
  { label: 'Contacto', path: ROUTES.contacto },
];
