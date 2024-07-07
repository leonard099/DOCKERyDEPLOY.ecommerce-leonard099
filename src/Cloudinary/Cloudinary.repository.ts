import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import * as toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryRepository {
    constructor() {}

    async uploadImage(file: Express.Multer.File):Promise<UploadApiResponse>{
        return new Promise((resolve, rejects) => {
            const uploadImage = v2.uploader.upload_stream(
                {resource_type:'auto'},
                (error, result) => {
                    if(error){
                        rejects(error)
                    }else {
                        resolve(result)
                    }
                },
            );
        toStream(file.buffer).pipe(uploadImage)
        });
    }
}