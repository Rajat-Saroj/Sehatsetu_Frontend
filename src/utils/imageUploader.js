import { v2 as cloudinary } from 'cloudinary';

export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    
    // Auto-detect if it's a video, image, or raw file
    options.resource_type = "auto";

    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
};