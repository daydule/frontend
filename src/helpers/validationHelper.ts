import * as z from 'zod';
import { MESSAGE } from '@/constant/validation';

type InputData = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export type ValidationResult = InputData & {
  invalid: boolean;
};

type SchemaData = {
  schema: string;
  data: InputData;
  result: ValidationResult;
};

const createSchema = (schemaData: SchemaData): void => {
  let validationSuccess: boolean = true;

  switch (schemaData.schema) {
    case 'email':
      const emailSchema = z.string().email();

      validationSuccess = emailSchema.safeParse(schemaData.data.email).success;
      if (!validationSuccess) schemaData.result.email = MESSAGE.EMAIL;

      break;
    case 'password':
      const passwordSchema = z.string().min(1);

      validationSuccess = passwordSchema.safeParse(schemaData.data.password).success;
      if (!validationSuccess) schemaData.result.password = MESSAGE.PASSWORD;

      break;
    case 'passwordConfirmation':
      if (schemaData.data.password !== schemaData.data.passwordConfirmation)
        schemaData.result.passwordConfirmation = MESSAGE.PASSWORDCONFIRMATION;
  }
};

export const formValidation = (inputData: InputData) => {
  const validationResult: ValidationResult = {
    invalid: false,
  };

  for (const [key, value] of Object.entries(inputData)) {
    createSchema({
      schema: key,
      data: inputData,
      result: validationResult,
    });
  }
  validationResult.invalid = Object.keys(validationResult).length > 1;

  return validationResult;
};
