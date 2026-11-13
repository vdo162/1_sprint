import { body } from 'express-validator';

const codePattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const loginOrEmailValidation = body('loginOrEmail')
  .isString()
  .withMessage('loginOrEmailValidation should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of loginOrEmailValidation is not correct');

export const passwordValidation = body('password')
  .isString()
  .withMessage('password should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of password is not correct');

export const codeValidation = body('code')
  .isString()
  .withMessage('code should be string')
  .trim()
  .matches(codePattern)
  .withMessage('Incorrect code');

export const emailValidation = body('email')
  .isString()
  .withMessage('email should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of email is not correct');

export const loginInputValidation = [
  loginOrEmailValidation,
  passwordValidation,
];
