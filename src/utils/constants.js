// Constantes de la aplicación

export const CATEGORIES = [
  {
    id: 1,
    name: 'Papel/Cartón',
    icon: require('../assets/images/papel-carton.webp'),
    color: '#3299e3',
    unit: 'kg',
    step: 0.5,
    min: 0,
    max: 50,
  },
  {
    id: 2,
    name: 'Plástico',
    icon: require('../assets/images/botella.webp'),
    color: '#4dc269',
    unit: 'Unid.',
    step: 1,
    min: 0,
    max: 99,
  },
  {
    id: 3,
    name: 'Metal',
    icon: require('../assets/images/metal.webp'),
    color: '#929aa0',
    unit: 'Unid.',
    step: 1,
    min: 0,
    max: 99,
  },
  {
    id: 4,
    name: 'Vidrio',
    icon: require('../assets/images/vidrio.webp'),
    color: '#64cde2',
    unit: 'Unid.',
    step: 1,
    min: 0,
    max: 99,
  },
  {
    id: 5,
    name: 'Orgánico',
    icon: require('../assets/images/organico.webp'),
    color: '#d27c2f',
    unit: 'kg',
    step: 0.5,
    min: 0,
    max: 50,
  },
  {
    id: 6,
    name: 'Otros',
    icon: require('../assets/images/otros.webp'),
    color: '#9471e5',
    unit: 'kg',
    step: 0.5,
    min: 0,
    max: 50,
  },
];

// Colores del tema
export const COLORS = {
  // Fondos
  targetFondo: '#eedfc0',
  target: '#FBF7EB',
  fondoFallback: '#4a7c3f',
  
  // Botones
  button: '#46a330',
  buttonDegradado: '#7bc224',
  
  // Textos
  textTitle: '#f3d645',
  textBorde: '#1d420f',
  textContenido: '#513015',
  textWhite: '#e9f5e6',
  
  // Avatares
  avatarGray: '#9ca3af',
  avatarGrayBorder: '#6b7280',
  avatarGreen: '#46a330',
  avatarBrown: '#a67c52',
  
  // Barra de progreso
  progressStart: '#C2F07C',
  progressMid: '#91D433',
  progressEnd: '#6EBF29',
  progressBg: '#d4bc98',
  
  // Color tipos de reciclaje
  tipoPapel: '#3299e3',
  tipoPlastico: '#4dc269',
  tipoMetal: '#929aa0',
  tipoOrganico: '#d27c2f',
  tipoVidrio: '#64cde2',
  tipoOtros: '#9471e5',
  
  // General
  primary: '#46a330',
  secondary: '#7bc224',
  background: '#f8f7e3',
  text: '#513015',
  textLight: '#666666',
};

// Datos de ejemplo para ranking
export const RANKING_DATA = {
  estudiantes: [
    {
      id: 1,
      name: 'Gallito Campeón',
      level: 'Gallito de las Rocas',
      badge: 'Safiro',
      points: 520,
      recyclings: 98,
      avatar: require('../assets/images/gallito-rocas.webp'),
      position: 1,
    },
    {
      id: 2,
      name: 'Elefante Sabio',
      level: 'Elefante',
      badge: 'Diamante',
      points: 480,
      recyclings: 85,
      avatar: require('../assets/images/elefante.webp'),
      position: 2,
    },
    {
      id: 3,
      name: 'Mono Veloz',
      level: 'Mono',
      badge: 'Oro',
      points: 350,
      recyclings: 72,
      avatar: require('../assets/images/mono.webp'),
      position: 3,
    },
    {
      id: 4,
      name: 'Hormiguita Trabajadora',
      level: 'Hormiga',
      badge: 'Hierro',
      points: 280,
      recyclings: 58,
      avatar: require('../assets/images/hormiga.webp'),
      position: 4,
    },
    {
      id: 5,
      name: 'Explorador Juan',
      level: 'Hormiga',
      badge: 'Cobre',
      points: 150,
      recyclings: 45,
      avatar: require('../assets/images/user.webp'),
      position: 5,
    },
  ],
  salones: [
    {
      id: 1,
      name: 'Salón 3A',
      level: 'Gallito de las Rocas',
      badge: 'Safiro',
      points: 1520,
      recyclings: 298,
      avatar: require('../assets/images/gallito-rocas.webp'),
      position: 1,
    },
    {
      id: 2,
      name: 'Salón 2B',
      level: 'Elefante',
      badge: 'Diamante',
      points: 1480,
      recyclings: 285,
      avatar: require('../assets/images/elefante.webp'),
      position: 2,
    },
    {
      id: 3,
      name: 'Salón 4C',
      level: 'Mono',
      badge: 'Oro',
      points: 1350,
      recyclings: 272,
      avatar: require('../assets/images/mono.webp'),
      position: 3,
    },
    {
      id: 4,
      name: 'Salón 1A',
      level: 'Hormiga',
      badge: 'Hierro',
      points: 1280,
      recyclings: 258,
      avatar: require('../assets/images/hormiga.webp'),
      position: 4,
    },
    {
      id: 5,
      name: 'Salón 5B',
      level: 'Hormiga',
      badge: 'Cobre',
      points: 1150,
      recyclings: 245,
      avatar: require('../assets/images/user.webp'),
      position: 5,
    },
  ],
};

