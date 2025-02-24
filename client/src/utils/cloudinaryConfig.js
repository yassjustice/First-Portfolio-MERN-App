import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: import.meta.env.CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_Key,
    api_secret: import.meta.env.CLOUDINARY_API_SECRETy,
    secure: true, // Ensures HTTPS is used
});

export default cloudinary;
