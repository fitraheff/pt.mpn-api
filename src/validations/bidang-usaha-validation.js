import Joi from "joi";

export const validationBU = Joi.object({
    nama_BUsaha: Joi.string()
        .min(3)
<<<<<<< HEAD
        .required()
        .messages({
            "string.empty": "Nama bidang usaha wajib diisi",
            "string.min": "Nama bidang usaha minimal 3 karakter",
=======
        .max(225)
        .trim()
        .required()
        .messages({
            "string.empty": "Nama bidang usaha wajib diisi",
            "string.min": "Nama bidang usaha minimal {#limit} karakter",
            "string.max": "Nama bidang usaha maksimal {#limit} karakter",
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
            "any.required": "Nama bidang usaha wajib diisi",
            "string.base": "Nama bidang usaha harus berupa teks"
        }),

    deskripsi: Joi.string()
<<<<<<< HEAD
        .optional()
=======
        .trim()
        .optional()
        .allow(null, "")
>>>>>>> 0df5a1fcd71c54d9bafeaba68dc6cf0c442649ce
        .messages({
            "string.base": "Deskripsi harus berupa teks"
        })
});
