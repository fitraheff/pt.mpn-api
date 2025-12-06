import Joi from "joi";

// CREATE VALIDATION
export const createGallerySchema = Joi.object({
  id_users: Joi.string().uuid().required(), // user yang upload wajib ada
  image: Joi.string().required(), // nama file gambar wajib ada
});

// UPDATE VALIDATION
export const updateGallerySchema = Joi.object({
  id_users: Joi.string().uuid().optional(), // boleh tidak diubah
  image: Joi.string().optional(), // gambar boleh tidak diganti
});