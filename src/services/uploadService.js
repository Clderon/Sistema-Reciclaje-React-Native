import { apiRequest } from '../config/api';
import * as FileSystem from 'expo-file-system';
import { validateImage, getFileSize, getMimeTypeFromAsset, MAX_IMAGE_SIZE, validateImageSize } from '../utils/imageValidation';

/**
 * Servicio para subir imágenes a S3 a través del backend
 */

/**
 * Convertir URI de imagen a base64
 * @param {String} imageUri - URI de la imagen (file:// o http://)
 * @returns {Promise<String>} String base64 con prefijo data:image/...
 */
async function imageToBase64(imageUri) {
  try {
    let base64;
    
    // Si es una URI local (file://), usar FileSystem
    if (imageUri.startsWith('file://') || imageUri.startsWith('content://')) {
      base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } 
    // Si es una URL HTTP/HTTPS, necesitamos descargarla primero
    else if (imageUri.startsWith('http://') || imageUri.startsWith('https://')) {
      const downloadResult = await FileSystem.downloadAsync(
        imageUri,
        FileSystem.documentDirectory + `temp-image-${Date.now()}.jpg`
      );
      base64 = await FileSystem.readAsStringAsync(downloadResult.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // Limpiar archivo temporal
      await FileSystem.deleteAsync(downloadResult.uri, { idempotent: true });
    } 
    // Si ya es base64, retornarlo directamente
    else if (imageUri.startsWith('data:image/')) {
      return imageUri;
    }
    else {
      throw new Error('Formato de URI no soportado');
    }

    // Determinar el tipo MIME basado en la extensión
    let mimeType = 'image/jpeg'; // Por defecto
    if (imageUri.includes('.png')) {
      mimeType = 'image/png';
    } else if (imageUri.includes('.webp')) {
      mimeType = 'image/webp';
    }

    // Retornar en formato data URI
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error('Error convirtiendo imagen a base64:', error);
    throw new Error('Error al procesar la imagen');
  }
}

/**
 * Contar imágenes del usuario
 * @param {Number} userId - ID del usuario
 * @returns {Promise<Object>} { count, maxAllowed, canUpload }
 */
export const getUserImageCount = async (userId) => {
  try {
    const response = await apiRequest(`/upload/count/${userId}`, {
      method: 'GET',
    });

    return {
      success: true,
      count: response.count,
      maxAllowed: response.maxAllowed,
      canUpload: response.canUpload,
    };
  } catch (error) {
    console.error('Error en getUserImageCount:', error);
    return {
      success: false,
      error: error.message || 'Error al contar imágenes',
    };
  }
};

/**
 * Subir imagen a S3 con validaciones
 * @param {String} imageUri - URI de la imagen local
 * @param {Number} userId - ID del usuario (para validar límite)
 * @param {Object} asset - Asset de ImagePicker (para obtener MIME type y tamaño)
 * @param {String} fileName - Nombre del archivo (opcional)
 * @returns {Promise<Object>} { success: Boolean, imageUrl?: String, error?: String }
 */
export const uploadImage = async (imageUri, userId = null, asset = null, fileName = null) => {
  try {
    // Validar límite de imágenes si se proporciona userId
    if (userId) {
      const countResult = await getUserImageCount(userId);
      
      if (!countResult.success) {
        return {
          success: false,
          error: countResult.error || 'Error al verificar límite de imágenes',
        };
      }

      if (!countResult.canUpload) {
        return {
          success: false,
          error: `Has alcanzado el límite de ${countResult.maxAllowed} imágenes (tienes ${countResult.count}). Elimina algunas antes de subir nuevas.`,
        };
      }
    }

    // Obtener tamaño del archivo
    const fileSize = asset?.fileSize || await getFileSize(imageUri);
    
    // Validar tamaño
    if (fileSize !== null) {
      const sizeValidation = validateImageSize(fileSize);
      if (!sizeValidation.valid) {
        return {
          success: false,
          error: sizeValidation.error,
        };
      }
    }

    // Obtener MIME type
    const mimeType = asset ? getMimeTypeFromAsset(asset) : null;

    // Validar formato
    const validation = validateImage(imageUri, mimeType, fileSize);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Convertir imagen a base64
    const base64Image = await imageToBase64(imageUri);

    // Subir al backend
    const finalFileName = fileName || `evidencia-${Date.now()}.jpg`;
    
    const response = await apiRequest('/upload/image', {
      method: 'POST',
      body: JSON.stringify({
        image: base64Image,
        fileName: finalFileName,
        userId: userId,
      }),
    });

    return {
      success: true,
      imageUrl: response.imageUrl,
    };
  } catch (error) {
    console.error('Error en uploadImage:', error);
    return {
      success: false,
      error: error.message || 'Error al subir imagen',
    };
  }
};

