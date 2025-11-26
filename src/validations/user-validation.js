// src/validations/user.validation.js
import Joi from 'joi';

const username = Joi.string()
    .min(3)
    .max(100)
    .trim()
    .required()
    .messages({
        'string.min': 'Username minimal 3 karakter',
        'string.max': 'Username maksimal 100 karakter',
        'any.required': 'Username wajib diisi',
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

// REGISTER
export const addUserValidation = Joi.object({
    username,
    email,
    password,
});

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
    username: username.optional(),
    email: email.optional(),
    password: Joi.string()
        .min(6)
        .max(100)
        .optional()
        .messages({
            'string.min': 'Password baru minimal 6 karakter',
        }),
}).min(1); // minimal 1 field diisi