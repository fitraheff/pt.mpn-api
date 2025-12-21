import joi from "joi";

// Rules
const partnerName = joi.string()
    .min(2)
    .max(250)
    .trim()
    .required()
    .messages({
        "string.empty": "Nama partner wajib diisi",
        "string.min": "Nama minimal 2 karakter",
        "string.max": "Nama maksimal 250 karakter",
        "any.required": "Nama wajib diisi",
    })

const partnerDesc = joi.string()
    .min(10)
    .max(250)
    .trim()
    .required()
    .messages({
        "string.empty": "Deskripsi wajib diisi",
        "string.min": "Deskripsi minimal 10 karakter",
        "string.max": "Deskripsi maksimal 250 karakter",
        "any.required": "Deskripsi wajib diisi",
    })

// Create
export const createPartnerValidation = joi.object({
    nama_partner: partnerName,
    deskripsi: partnerDesc,
})

// GetById
export const getPartnerByIdValidation = joi.string()
    .trim()
    .uuid({ version: ['uuidv4'] })
    .required()
    .messages({
        "string.empty": "Id wajib diisi",
        "string.uuid": "Id tidak valid",
        "any.required": "Id wajib diisi",
    })

// Update
export const updatePartnerValidation = joi.object({
    nama_partner: partnerName.optional(),
    deskripsi: partnerDesc.optional(),
})