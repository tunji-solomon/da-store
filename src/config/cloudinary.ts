import { v2 } from 'cloudinary'

export  const cloudinary = v2.config(String(process.env.CLOUDINARY_URL));

