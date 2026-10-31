import { body } from 'express-validator';

const titleValidation = body('title')
  .isString()
  .withMessage('title should be string')
  .trim()
  .isLength({ min: 3, max: 30 })
  .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription should be string')
  .trim()
  .isLength({ min: 3, max: 100 })
  .withMessage('Length of shortDescription is not correct');

const contentValidation = body('content')
  .isString()
  .withMessage('content should be string')
  .trim()
  .isLength({ min: 3, max: 1000 })
  .withMessage('Length of content is not correct');

const blogIdValidation = body('blogId')
  .exists()
  .withMessage('BlogId is required')
  .isString()
  .withMessage('BlogId must be a string')
  .isMongoId()
  .withMessage('Incorrect format of ObjectId');

export const postInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  blogIdValidation,
];

export const blogPostInputValidation = [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
];
