// // Import library multer
// import multer from "multer";

// // Menyimpan file logo ke dalam memory (RAM) bukan folder lokal
// const storage = multer.memoryStorage();

// export const uploadPartnerLogo = multer({
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // maksimal 5MB
//     },
//     fileFilter(req, file, cb) {
//         const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//         if (!allowed.includes(file.mimetype)) {
//             return cb(new Error("Format logo harus jpg, jpeg, png, atau webp"));
//         }
//         cb(null, true);
//     }
// }).single("logo"); // nama field di form dan hanya menerima 1 file

import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads'

        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        cb(null, dir)
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(null, "partner-" + unique + ext);
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

export const uploadPartnerLogo = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } //5MB
}).single('logo');