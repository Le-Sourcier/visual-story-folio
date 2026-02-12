import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { sendValidationError } from '../utils/response.util.js';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      next();
      return;
    }

    const errorMessages = errors
      .array()
      .map((err) => {
        if ('path' in err) {
          return `${err.path}: ${err.msg}`;
        }
        return err.msg;
      })
      .join(', ');

    sendValidationError(res, errorMessages);
  };
};

export default validate;
