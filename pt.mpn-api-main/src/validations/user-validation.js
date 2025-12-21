import Joi from 'joi';

const name = Joi.string()
    .min(3)
    .max(100)
    .trim()
    .required()
    .messages({
        'string.min': 'name minimal 3 karakter',
        'any.required': 'name wajib diisi',
    });

const email = Joi.string()
    .email({ tlds: { allow: false } })
    .max(100)
    .trim()
    .lowercase()
    .required()
    .messages({
        'string.email': 'Email tidak valid',
        'any.required': 'Email wajib diisi',
    });

const password = Joi.string()
    .min(6)
    .max(100)
    .required()
    .messages({
        'string.min': 'Password minimal 6 karakter',
        'any.required': 'Password wajib diisi',
    });

const telp = Joi.string()
    .trim()
    .pattern(/^(\+62|62|0)[0-9]{9,13}$/)  // 11–15 digit, mulai 08/628/+628
    .required()
    .messages({
        'string.empty'       : 'Nomor telepon wajib diisi',
        'any.required'       : 'Nomor telepon wajib diisi',
        'string.pattern.base': 'Nomor telepon minimal 11 dan maksimal 15 digit. Contoh: 081234567890',
    });

// REGISTER
export const addUserValidation = Joi.object({
    name,
    email,
    password: password.optional(),
    telp: telp,
}).required();

// LOGIN
export const loginUserValidation = Joi.object({
    email: email.required(),
    password: Joi.string().required().messages({
        'any.required': 'Password wajib diisi',
    }),
});

// GET USER BY ID (params)
export const getUserValidation = Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required()
    .messages({
        'string.guid': 'ID user tidak valid',
        'any.required': 'ID user wajib diisi',
    });

// UPDATE USER (hanya yang diisi saja)
export const updateUserValidation = Joi.object({
    name: name.optional(),
    email: email.optional(),
    telp: telp.optional(),
    password: password.optional(),
    currentPassword: Joi.string()
        .min(6)
        .when('password', {
            is: Joi.exist().not(null),
            then: Joi.required().messages({
                'any.required': 'Current password wajib diisi untuk ganti password',
            }),
            otherwise: Joi.forbidden(),       // kalau password kosong → currentPassword dilarang
        }),
}).min(1); // minimal 1 field diisi

// export const updateUserByAdminValidation = Joi.object({
//     jabatan: Joi.string().max(100).trim().optional(),
//     role: Joi.string().valid('ADMIN', 'SUPERADMIN').optional(),
// }).min(1);