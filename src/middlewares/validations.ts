import { celebrate, Joi } from 'celebrate';
import { validateEmail, validateURL } from '../utils/utils';

export const validateCreateCard = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина 2 символа',
        'string.max': 'Максимальная длина 30 символов',
        'any.required': 'Обязательное поле',
      }),
    link: Joi.string().required().custom(validateURL).messages({
      'any.required': 'Обязательное поле',
      'any.invalid': 'Некорректный URL',
    }),
  },
});

export const validateCreateUser = celebrate({
  body: {
    avatar: Joi.string().required().custom(validateURL).messages({
      'any.required': 'Обязательное поле',
      'any.invalid': 'Некорректный URL',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина 2 символа',
        'string.max': 'Максимальная длина 30 символов',
        'any.required': 'Обязательное поле',
      }),
    about: Joi.string().min(2).max(200).messages({
      'string.min': 'Минимальная длина 2 символа',
      'string.max': 'Максимальная длина 200 символов',
      'any.required': 'Обязательное поле',
    }),
    email: Joi.string().required().custom(validateEmail).messages({
      'any.required': 'Обязательное поле',
      'any.invalid': 'Некорректный email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
  },
});

export const validatePatchUser = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина 2 символа',
        'string.max': 'Максимальная длина 30 символов',
        'any.required': 'Обязательное поле',
      }),
    about: Joi.string().min(2).max(200).messages({
      'string.min': 'Минимальная длина 2 символа',
      'string.max': 'Максимальная длина 200 символов',
      'any.required': 'Обязательное поле',
    }),
  },
});

export const validatePatchAvatar = celebrate({
  body: {
    avatar: Joi.string().required().custom(validateURL).messages({
      'any.required': 'Обязательное поле',
      'any.invalid': 'Некорректный URL',
    }),
  },
});

export const validateLogin = celebrate({
  body: {
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'any.required': 'Обязательное поле',
        'any.invalid': 'Некорректный email',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Обязательное поле',
    }),
  },
});
