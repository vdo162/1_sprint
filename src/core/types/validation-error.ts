export type ValidationErrorType = {
  field: string;
  message: string;
};

export type ValidationErrorsMessages = {
  errorsMessages: ValidationErrorType[];
};
