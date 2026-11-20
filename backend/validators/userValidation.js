import joi from "joi"

export const registerSchema = joi.object({
  name: joi.string().min(2).max(50).required().messages({
    "string.empty": "Name cannot be emty",
    "string.min": "minmum 2 characters",
    "any.required": "name is required",
  }),

  email: joi.string().trim().email().required().messages({
    "string.email": "Plase enter your email",
    "any.required": "Email is rquired",
  }),

  password: joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 charactres",
    "any.required": "password is required",
  }),
});

export const loginSchema = joi.object({
  email: joi.string().trim().email().required().messages({
    "string.email": "Plase enter your email",
    "any.required": "Email is rquired",
  }),

  password: joi.string().required().messages({
    "any.required": "password is required",
  }),
});
