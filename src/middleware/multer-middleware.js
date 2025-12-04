import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/'

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, dir)
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + ext);
    }
});

//image type validation
const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

    if(!allowed.includes(file.mimetype)) {
        return cb(new Error('Image type invalid'));
    }

    cb (null, true);
};


export const upload = (fieldName) => multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } //5MB
}).single(fieldName);
