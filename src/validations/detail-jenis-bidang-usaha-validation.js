import joi from "joi";

// Rules
const Name = joi.string()
    .min(2)
    .max(250)
    .trim()
    .required()
    .messages({
        "string.empty": "Nama wajib diisi",
        "string.min": "Nama minimal 2 karakter",
        "string.max": "Nama maksimal 250 karakter",
        "any.required": "Nama wajib diisi",
    })

// Create
export const createDetailJenisBidangUsahaValidation = joi.object({
    nama: Name
})

// GetById
export const getDetailJenisByIdValidation = joi.string()
    .trim()
    .uuid({version: ['uuidv4']})
    .required()
    .messages({
        "string.empty": "Id wajib diisi",
        "string.uuid": "Id tidak valid",
        "any.required": "Id wajib diisi",
    })

// Update
export const updateDetailJenisValidation = joi.object({
    nama: Name.optional()
})