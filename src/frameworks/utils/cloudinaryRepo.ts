import ICloudinaryRepository from "../../useCase/interface/repositoryIntrfce/cloudinaryRepo"
import cloudinary from '../services/cloudinary'
import fs from 'fs'

export class Cloudinary implements ICloudinaryRepository {
  constructor() { }
  async saveToCloudinary(file: any, folder: string) {

    const allowedVideoTypes = ["mp4", "mov", "avi", "mkv"];
    const allowedDocTypes = [
      "pdf",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
      "zip",
    ];
    const allowedImageTypes = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp"];
    const allowedAudioTypes = ['mp3', 'wav', 'ogg', 'flac','aiff','alac']
    
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    let resourceType: 'image' | 'video' | 'raw' | 'auto' = 'raw';
    if (allowedVideoTypes.includes(fileExtension)) {
      resourceType = 'video';
    } else if (allowedImageTypes.includes(fileExtension)) {
      resourceType = 'image';
    } else if(allowedAudioTypes.includes(fileExtension)){
      resourceType ='auto';
    }

    if (
      allowedVideoTypes.includes(fileExtension) ||
      allowedDocTypes.includes(fileExtension) ||
      allowedImageTypes.includes(fileExtension) ||
      allowedAudioTypes.includes(fileExtension)

    ) {
      const result = await cloudinary.v2.uploader.upload(file?.path, { folder, resource_type: resourceType, })

      if (typeof file.path === 'string' && file.path.trim().length > 0) {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
        });
      } else {
        console.error('Invalid file path:', file.path);
      }
      file = result.secure_url
      return file
    }

  }
}