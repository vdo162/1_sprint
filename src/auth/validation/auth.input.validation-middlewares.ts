import { body } from 'express-validator';

const loginOrEmail = body('loginOrEmail')
  .isString()
  .withMessage('loginOrEmail should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of loginOrEmail is not correct');

export const passwordValidation = body('password')
  .isString()
  .withMessage('password should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of password is not correct');

export const authInputValidation = [loginOrEmail, passwordValidation];
