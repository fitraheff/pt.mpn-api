import Joi from "joi";

export const validationBU = Joi.object({
    nama_BUsaha: Joi.string()
        .min(3)
        .max(225)
        .trim()
        .required()
        .messages({
            "string.empty": "Nama bidang usaha wajib diisi",
            "string.min": "Nama bidang usaha minimal {#limit} karakter",
            "string.max": "Nama bidang usaha maksimal {#limit} karakter",
            "any.required": "Nama bidang usaha wajib diisi",
            "string.base": "Nama bidang usaha harus berupa teks"
        }),

    deskripsi: Joi.string()
        .trim()
        .optional()
        .allow(null, "")
        .messages({
            "string.base": "Deskripsi harus berupa teks"
        })
});
