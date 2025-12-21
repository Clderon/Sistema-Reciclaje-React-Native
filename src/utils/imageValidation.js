/**
 * Utilidades para validar imágenes antes de subirlas
 */

// Formatos permitidos (formatos estándar de fotos en celular)
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Extensiones permitidas
export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Tamaño máximo: 15 MB (en bytes)
export const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15 MB

// Tamaño mínimo (opcional): 10 KB
export const MIN_IMAGE_SIZE = 10 * 1024; // 10 KB

/**
 * Validar formato de imagen por MIME type
 * @param {String} mimeType - Tipo MIME de la imagen
 * @returns {Boolean}
 */
export const isValidImageType = (mimeType) => {
  return ALLOWED_IMAGE_TYPES.includes(mimeType?.toLowerCase());
};

/**
 * Validar tamaño de imagen
 * @param {Number} sizeInBytes - Tamaño del archivo en bytes
 * @returns {Object} { valid: Boolean, error: String|null }
 */
export const validateImageSize = (sizeInBytes) => {
  if (!sizeInBytes || sizeInBytes === 0) {
    return {
      valid: false,
      error: 'No se pudo determinar el tamaño de la imagen',
    };
  }

  if (sizeInBytes < MIN_IMAGE_SIZE) {
    return {
      valid: false,
      error: `La imagen es muy pequeña. Debe tener al menos ${MIN_IMAGE_SIZE / 1024} KB`,
    };
  }

  if (sizeInBytes > MAX_IMAGE_SIZE) {
    const maxSizeMB = MAX_IMAGE_SIZE / (1024 * 1024);
    return {
      valid: false,
      error: `La imagen es muy grande. El tamaño máximo permitido es ${maxSizeMB} MB`,
    };
  }

  return { valid: true, error: null };
};

/**
 * Validar imagen completa (tipo y tamaño)
 * @param {String} uri - URI de la imagen
 * @param {String} mimeType - Tipo MIME (opcional, se puede inferir de la URI)
 * @param {Number} sizeInBytes - Tamaño en bytes
 * @returns {Object} { valid: Boolean, error: String|null }
 */
export const validateImage = (uri, mimeType = null, sizeInBytes = null) => {
  // Inferir MIME type de la URI si no se proporciona
  let inferredMimeType = mimeType;
  if (!inferredMimeType && uri) {
    const extension = uri.toLowerCase().split('.').pop();
    if (extension === 'jpg' || extension === 'jpeg') {
      inferredMimeType = 'image/jpeg';
    } else if (extension === 'png') {
      inferredMimeType = 'image/png';
    } else if (extension === 'webp') {
      inferredMimeType = 'image/webp';
    }
  }

  // Validar tipo (solo si tenemos un tipo)
  if (inferredMimeType && !isValidImageType(inferredMimeType)) {
    return {
      valid: false,
      error: `Formato de imagen no permitido. Formatos permitidos: JPEG, PNG o WEBP`,
    };
  }

  // Validar tamaño si se proporciona
  if (sizeInBytes !== null) {
    const sizeValidation = validateImageSize(sizeInBytes);
    if (!sizeValidation.valid) {
      return sizeValidation;
    }
  }

  return { valid: true, error: null };
};

/**
 * Obtener tamaño de archivo desde URI (para React Native)
 * Usa la nueva API de expo-file-system
 * @param {String} uri - URI del archivo
 * @returns {Promise<Number>} Tamaño en bytes
 */
export const getFileSize = async (uri) => {
  try {
    const { File } = require('expo-file-system/next');
    const file = new File(uri);
    const info = await file.getInfo();
    
    if (info.exists && info.size !== undefined) {
      return info.size;
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo tamaño de archivo:', error);
    return null;
  }
};

/**
 * Obtener MIME type desde URI o asset
 * @param {Object} asset - Asset de ImagePicker (result.assets[0])
 * @returns {String} MIME type
 */
export const getMimeTypeFromAsset = (asset) => {
  // ImagePicker puede proporcionar el tipo directamente
  if (asset.mimeType) {
    return asset.mimeType;
  }

  // Inferir de la URI
  const uri = asset.uri || '';
  const extension = uri.toLowerCase().split('.').pop();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg'; // Por defecto
  }
};

