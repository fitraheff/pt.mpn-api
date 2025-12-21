import Joi from 'joi';

//Declarations
const nama = Joi.string()
    .min(3)
    .max(100)
    .trim()
    .required()
    .messages({
        'string.min': 'nama minimal 3 karakter',
        'string.max': 'nama maksimal 100 karakter',
        'any.required': 'nama wajib diisi',
    });

const pesan_testi = Joi.string()
    .min(10)
    .max(255)
    .trim()
    .required()
    .messages({
        'string.min': 'pesan minimal 10 karakter',
        'string.max': 'nama maksimal 255 karakter',
        'any.required': 'pesan harus diisi'
    });

//Create validation
export const addTestimonyValidation = Joi.object({
    nama,
    pesan_testi
}).required();

//GET by id validation
export const getTestimonyByIdValidation = Joi.string()
    .uuid({ version: ['uuidv4'] })
    .required()
    .messages({
        'string.guide': 'ID testimony invalid',
        'any.required': 'ID testimony wajib diisi'
    })

//Update validation
export const updateTestimonyValidation = Joi.object({
    nama: nama.optional(),
    pesan_testi: pesan_testi.optional()
}).min(1);

//Delete validation
export const deleteTestimonyValidation = Joi.object({
    id: Joi.string().uuid({ version: ['uuidv4'] }).required()
})

