import multer from "multer";
import crypto from 'crypto';

import { extname, resolve}  from 'path';


// Multer significa as imagens que serão disponibilizadas no meu banco de dados
export default {
    upload(folder : string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }

            })
        }
    }
}