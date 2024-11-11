import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configura Cloudinary con las credenciales de las variables de entorno
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret,
});

// Función para subir una imagen a Cloudinary
export async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'replit', // Especifica la carpeta en Cloudinary
    });
    return result; // Devuelve el resutado
  } catch (error) {
    throw new Error('Error uploading image');
  }
}

// Función para eliminar una imagen a Cloudinary
export async function deleteImageFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete image. ${result.result}`);
    }

  } catch (error) {
    throw new Error(`Error deleting image. ${error}`);

  }
}
