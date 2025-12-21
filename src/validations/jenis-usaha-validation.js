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

const Deskripsi = joi.string()
    .min(3)
    .max(250)
    .trim()
    .required()
    .messages({
        "string.empty": "Deskripsi wajib diisi",
        "string.min": "Deskripsi minimal 3 karakter",
        "string.max": "Deskripsi maksimal 250 karakter",
        "any.required": "Deskripsi wajib diisi",
    })

const Status = joi.string().required()

// Create
export const createJenisUsahaValidation = joi.object({
    nama_jenis: Name,
    deskripsi: Deskripsi,
    status: Status,
    // bidangUsahaId: bidangUsahaId,
})

// GetById
export const getJenisUsahaByIdValidation = joi.string()
    .trim()
    .uuid({ version: ['uuidv4'] })
    .required()
    .messages({
        "string.empty": "Id wajib diisi",
        "string.uuid": "Id tidak valid",
        "any.required": "Id wajib diisi",
    })

// Update
export const updateJenisUsahaValidation = joi.object({
    nama_jenis: Name.optional(),
    deskripsi: Deskripsi.optional(),
    status: Status.optional(),
    // bidangUsahaId: bidangUsahaId.optional(),
})