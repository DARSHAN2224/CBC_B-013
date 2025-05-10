import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { ApiError } from "./ApiError.js"
// import dotenv from "dotenv";
// Configuration
// dotenv.config()
if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_KEY || !process.env.CLOUDINARY_SECRET) {
    throw new ApiError('Cloudinary configuration missing', 500, 'Check environment variables');
}
// console.log(process.env.CLOUDINARY_KEY,process.env.CLOUDINARY_NAME,process.env.CLOUDINARY_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
       const response = await cloudinary.uploader.upload(localFilePath, {resource_type: 'auto'})
        console.log("Uploaded to Cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        return response;
    }catch(err){
        console.log('Error in uploadOnCloudinary', err);
        fs.unlinkSync((localFilePath))//remove file from server 
        throw new ApiError("", 500, "Error in uploadOnCloudinary")
    }

}

export default uploadOnCloudinary;