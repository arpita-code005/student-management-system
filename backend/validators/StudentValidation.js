import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 2 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  age: Joi.number().min(5).max(100).required().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age must be at least 5',
    'number.max': 'Age must be less than 100',
    'any.required': 'Age is required',
  }),
  course: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Course cannot be empty',
    'any.required': 'Course is required',
  }),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.min': 'Name must be at least 2 characters',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please enter a valid email',
  }),
  age: Joi.number().min(5).max(100).messages({
    'number.min': 'Age must be at least 5',
    'number.max': 'Age must be less than 100',
  }),
  course: Joi.string().min(2).max(100).messages({
    'string.empty': 'Course cannot be empty',
  }),
});