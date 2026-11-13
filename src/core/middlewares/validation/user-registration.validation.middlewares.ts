import { body } from 'express-validator';

const loginPattern = /^[a-zA-Z0-9_-]*$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const loginValidation = body('login')
  .isString()
  .withMessage('login should be string')
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage('Length of login is not correct')
  .matches(loginPattern)
  .withMessage('login should be valid');

export const passwordValidation = body('password')
  .isString()
  .withMessage('password should be string')
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage('Length of password is not correct');

const emailValidation = body('email')
  .isString()
  .withMessage('email should be string')
  .trim()
  .isLength({ min: 2, max: 100 })
  .withMessage('Length of email is not correct')
  .matches(emailPattern)
  .withMessage('email should be valid');

export const userInputValidation = [
  loginValidation,
  passwordValidation,
  emailValidation,
];
