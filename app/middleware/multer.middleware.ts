import multer from 'multer'
import path from 'path'
import fs from 'fs'

const folderPath = path.join(__dirname,"../../upload")

if(!fs.existsSync(folderPath)){
 fs.mkdirSync(folderPath)
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,folderPath)
    },
    filename:(req,file,cb)=>{
     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
     const ext = path.extname(file.originalname)
     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
})

export const upload = multer({storage})