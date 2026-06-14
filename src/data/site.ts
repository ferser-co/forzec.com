// Datos centralizados del sitio FORZEC.
// FORZEC es una MARCA (no un producto) lanzada por AseoLab.
// Reemplazá los TODO_* antes de publicar.

export const site = {
  brand: {
    name: 'FORZEC',
    tagline: 'Limpieza técnica premium · multisuperficies',
    company: 'ASEOLAB S.A.S.',
    companyUrl: 'https://aseolab.co',
    builtBy: 'Ferser',
    builtByUrl: 'https://ferser.co',
  },

  // Reemplazar antes de publicar
  whatsappNumber: '573186101498', // formato: 57XXXXXXXXXX
  whatsappMessage: 'Estoy interesado en productos de la marca FORZEC.',
  rappiUrl: 'https://www.rappi.com.co/tiendas/900420847-aseolabsas-mt-enc/s?term=aseolab%20sas',
  rappiQr: null as string | null,

  // Si llegan los logos oficiales de certificación, poné true.
  showCertLogos: false,
} as const;

/** URL de WhatsApp con mensaje genérico de la marca. */
export const waUrl = () =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

/** URL de WhatsApp pre-llenada para preguntar por un producto específico. */
export const waForProduct = (productName: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hola, quiero información sobre ${productName} (FORZEC).`,
  )}`;

/** URL de WhatsApp para pedir aviso de lanzamiento de un producto próximamente. */
export const waNotifyMe = (productName: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hola, me gustaría que me avisen cuando ${productName} (FORZEC) esté disponible.`,
  )}`;

// ─── Navegación ──────────────────────────────────────────────────────────
export const nav = [
  { label: 'Líneas', href: '#lineas' },
  { label: 'Productos', href: '#productos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Comprar', href: '#comprar' },
] as const;

// ─── Líneas de producto ──────────────────────────────────────────────────
export interface Product {
  id: string;
  slug: string;
  line: 'hogar' | 'detailing';
  category: string;          // texto pequeño en uppercase ej. "FORZEC DETAILING PRO"
  name: string;              // título H3
  slogan: string;            // se renderiza en itálica
  badges: { icon: string; label: string }[]; // atributos clave (lucide icon name)
  sizes: string[];           // presentaciones disponibles
  packaging: {
    label: string;           // texto descriptivo
    color: string;           // hex CSS para el mockup (legacy, no se usa hoy)
    tone: 'light' | 'dark';
  };
  /** Foto del producto. Si falta, el producto se lista como "Próximamente" en
   *  vez de renderizarse como tarjeta completa. */
  image?: string;
}

export interface ProductLine {
  id: 'hogar' | 'detailing';
  name: string;              // "Línea Hogar"
  fullName: string;          // "Línea Hogar – FORZEC"
  subtitle: string;          // descripción corta para sección Lines
  tone: 'light' | 'dark';
  accentColor: string;       // hex para acentos del grupo
  products: Product[];
}

const HOGAR: Product[] = [
  {
    id: 'hogar-01',
    slug: 'crema-multiusos',
    line: 'hogar',
    category: 'FORZEC HOGAR',
    name: 'Crema Multiusos',
    slogan: 'Todo, todo es todo.',
    badges: [
      { icon: 'flask-conical', label: 'Concentrado' },
      { icon: 'leaf',          label: 'Biodegradable' },
      { icon: 'layers',        label: 'Multisuperficie' },
    ],
    sizes: ['220 g', '500 g', '1 kg'],
    packaging: { label: 'Tubo HDPE negro', color: '#0c0c0c', tone: 'dark' },
    image: '/images/products/crema-forzec-muliusos.jpeg',
  },
  {
    id: 'hogar-02',
    slug: 'gel-multiaccion',
    line: 'hogar',
    category: 'FORZEC HOGAR',
    name: 'Gel Multiacción',
    slogan: 'Máxima acción, mínimo esfuerzo.',
    badges: [
      { icon: 'droplets',  label: 'Alta viscosidad' },
      { icon: 'sparkles',  label: 'Limpia y abrillanta' },
    ],
    sizes: ['250 g', '500 g'],
    packaging: { label: 'Envase PET transparente', color: '#e0e7ee', tone: 'light' },
  },
];

const DETAILING: Product[] = [
  {
    id: 'detailing-01',
    slug: 'shampoo-vehicular',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Shampoo Vehicular',
    slogan: 'Brillo y protección en cada lavado.',
    badges: [
      { icon: 'beaker',  label: 'pH neutro' },
      { icon: 'wind',    label: 'Espuma controlada' },
      { icon: 'leaf',    label: 'Biodegradable' },
    ],
    sizes: ['500 ml', '1 L', '4 L'],
    packaging: { label: 'PET ámbar', color: '#b8762a', tone: 'dark' },
    image: '/images/products/shampoo-vehiculos.jpeg',
  },
  {
    id: 'detailing-02',
    slug: 'black-shield-partes-negras',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Black Shield · Restaurador de Partes Negras',
    slogan: 'El escudo definitivo para tus plásticos.',
    badges: [
      { icon: 'shield-check', label: 'Restauración premium' },
      { icon: 'sun',          label: 'Protección UV' },
      { icon: 'droplets',     label: 'Hidrofóbico' },
      { icon: 'zap',          label: 'Antiestático' },
    ],
    sizes: ['60 ml', '250 ml', '500 ml', '1 gal', '5 gal'],
    packaging: { label: 'PET negro', color: '#111111', tone: 'dark' },
    image: '/images/products/restaurador-partes-negras.jpeg',
  },
  {
    id: 'detailing-03',
    slug: 'limpia-vidrios',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Limpia Vidrios',
    slogan: 'Visión clara, brillo extremo.',
    badges: [
      { icon: 'zap',         label: 'Antiestático' },
      { icon: 'shield-off',  label: 'Sin amoníaco' },
    ],
    sizes: ['500 ml', '1 L'],
    packaging: { label: 'PET transparente', color: '#cfe1ed', tone: 'light' },
    image: '/images/products/limpia-vidrios.jpeg',
  },
  {
    id: 'detailing-04',
    slug: 'desencrustante-mofles',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Desencrustante para Mofles',
    slogan: 'Acción ácida controlada · elimina óxido y carbón.',
    badges: [
      { icon: 'flame',    label: 'Acción ácida controlada' },
      { icon: 'sparkles', label: 'Restaura brillo metal' },
      { icon: 'wind',     label: 'Fragancia cítrica' },
    ],
    sizes: ['250 ml', '500 ml', '1 L', '1 gal', '5 gal'],
    packaging: { label: 'PET negro · etiqueta roja', color: '#0c0c0c', tone: 'dark' },
    image: '/images/products/desencrustante-mofles.jpeg',
  },
  {
    id: 'detailing-09',
    slug: 'magnus-desengrasante-motores',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO · MAGNUS',
    name: 'Magnus · Desengrasante en Gel para Motores',
    slogan: 'No requiere agua. Eco-friendly.',
    badges: [
      { icon: 'flame',        label: 'Desengrasante en gel' },
      { icon: 'droplet-off',  label: 'No requiere agua' },
      { icon: 'leaf',         label: 'Biodegradable · Eco-friendly' },
      { icon: 'battery-charging', label: 'Apto combustión, híbrido y eléctrico' },
    ],
    sizes: ['250 ml', '400 ml', '1 gal', '5 gal'],
    packaging: { label: 'HDPE negro · etiqueta dorada', color: '#0c0c0c', tone: 'dark' },
    image: '/images/products/magnus-desengrasante-en-gel-para-motores.jpeg',
  },
  {
    id: 'detailing-10',
    slug: 'limpia-metales',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Limpia Metales',
    slogan: 'Devuelve el brillo al acero y cromados.',
    badges: [
      { icon: 'sparkles', label: 'Abrillantador metálico' },
      { icon: 'shield',   label: 'Capa protectora' },
    ],
    sizes: ['250 ml', '500 ml'],
    packaging: { label: 'PET gris metalizado', color: '#8e9099', tone: 'dark' },
  },
  {
    id: 'detailing-11',
    slug: 'kit-detailing-pro',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Kit Detailing Pro',
    slogan: 'El arsenal completo, listo para usar.',
    badges: [
      { icon: 'package',  label: 'Kit profesional' },
      { icon: 'sparkles', label: 'Resultado integral' },
      { icon: 'gift',     label: 'Edición especial' },
    ],
    sizes: ['Caja kit'],
    packaging: { label: 'Estuche cartón premium', color: '#0c0c0c', tone: 'dark' },
    image: '/images/products/kit-detailing-pro.jpeg',
  },
  {
    id: 'detailing-05',
    slug: 'ambientador-spray',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Ambientador Spray',
    slogan: 'El aroma de la perfección.',
    badges: [
      { icon: 'wind',         label: 'Fragancia prolongada' },
      { icon: 'shield-check', label: 'Antibacterial' },
    ],
    sizes: ['250 ml', '500 ml'],
    packaging: { label: 'PET transparente', color: '#dfe5ee', tone: 'light' },
    image: '/images/products/ambientador-spray.jpeg',
  },
  {
    id: 'detailing-06',
    slug: 'cera-liquida',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Cera Líquida',
    slogan: 'Brillo espejo en segundos.',
    badges: [
      { icon: 'sparkles', label: 'Polímeros sintéticos' },
      { icon: 'droplets', label: 'Repelente de agua' },
    ],
    sizes: ['250 ml', '500 ml'],
    packaging: { label: 'PET blanco perla', color: '#ece9e2', tone: 'light' },
  },
  {
    id: 'detailing-07',
    slug: 'eliminador-olores',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Eliminador de Olores',
    slogan: 'Neutraliza, no disfraza.',
    badges: [
      { icon: 'wind', label: 'Biotecnología desodorizante' },
    ],
    sizes: ['250 ml', '500 ml'],
    packaging: { label: 'PET ámbar', color: '#b8762a', tone: 'dark' },
    image: '/images/products/eliminador-olores.jpeg',
  },
  {
    id: 'detailing-08',
    slug: 'limpia-visores',
    line: 'detailing',
    category: 'FORZEC DETAILING PRO',
    name: 'Limpiador de Visores',
    slogan: 'Claridad total para tus rutas.',
    badges: [
      { icon: 'eye',  label: 'Antiempañante' },
      { icon: 'zap',  label: 'Polímero antiestático' },
    ],
    sizes: ['120 ml', '250 ml'],
    packaging: { label: 'PET transparente', color: '#dfe5ee', tone: 'light' },
  },
];

export const productLines: ProductLine[] = [
  {
    id: 'hogar',
    name: 'Línea Hogar',
    fullName: 'Línea Hogar — FORZEC',
    subtitle: 'Limpieza diaria, potencia profesional.',
    tone: 'light',
    accentColor: '#e11d2a',
    products: HOGAR,
  },
  {
    id: 'detailing',
    name: 'Línea Detailing Pro',
    fullName: 'Detailing Pro — FORZEC',
    subtitle: 'Cuidado automotriz de alto rendimiento.',
    tone: 'dark',
    accentColor: '#e11d2a',
    products: DETAILING,
  },
];

/** Lookup rápido por id. */
export const allProducts: Product[] = productLines.flatMap((l) => l.products);

// ─── Beneficios (brand-level) ────────────────────────────────────────────
export const benefits = [
  { icon: 'flame',    title: 'Desengrasa', desc: 'Rompe la grasa más pesada sin tallar.' },
  { icon: 'sparkles', title: 'Desmancha',  desc: 'Elimina manchas difíciles al instante.' },
  { icon: 'sun',      title: 'Blanquea',   desc: 'Devuelve el color y brillo original.' },
  { icon: 'scissors', title: 'Despega',    desc: 'Remueve residuos y suciedad extrema.' },
] as const;

export const metrics = [
  { value: '95%',  label: 'menos agua' },
  { value: '70%',  label: 'menos tiempo' },
  { value: '100%', label: 'resultados pro' },
] as const;

export const certs = [
  { code: 'NFPA',          label: 'Cumple estándares de seguridad' },
  { code: 'ABG',           label: 'Certificación de calidad' },
  { code: 'BIODEGRADABLE', label: 'Fórmula amigable con el medio ambiente' },
  { code: 'USO SEGURO',    label: 'No corrosivo · No inflamable' },
] as const;

// ─── Videos de demos (resultados reales) ─────────────────────────────────
export const demos = [
  { icon: 'wrench',     label: 'Motor',         video: '/videos/motor.mp4',   poster: undefined as string | undefined },
  { icon: 'bike',       label: 'Moto',          video: '/videos/moto.mp4',    poster: undefined as string | undefined },
  { icon: 'lock',       label: 'Metales',       video: '/videos/candado.mp4', poster: '/images/candado.jpeg' },
  { icon: 'footprints', label: 'Cuero/textil',  video: '/videos/zapatos.mp4', poster: '/images/zapatos.jpeg' },
] as const;
