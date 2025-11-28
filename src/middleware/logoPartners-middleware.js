import multer from "multer";

const storage = multer.memoryStorage();

export const uploadPartnerLogo = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter(req, file, cb) {
        const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Format logo harus jpg, jpeg, png, atau webp"));
        }
        cb(null, true);
    }
}).single("logo");
