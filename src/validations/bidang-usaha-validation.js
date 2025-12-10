import Joi from "joi";

export const validationBU = Joi.object({
    nama_BUsaha: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": "Nama bidang usaha wajib diisi",
            "string.min": "Nama bidang usaha minimal 3 karakter",
            "any.required": "Nama bidang usaha wajib diisi",
            "string.base": "Nama bidang usaha harus berupa teks"
        }),

    deskripsi: Joi.string()
        .optional()
        .messages({
            "string.base": "Deskripsi harus berupa teks"
        })
});
