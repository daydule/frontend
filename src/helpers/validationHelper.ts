import * as z from 'zod';

type inputData = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

export type validationResult = inputData & {
  invalid: boolean;
};

type schemaData = {
  schema: string;
  data: string;
  result: validationResult;
};

const createSchema = (schemaData: schemaData): void => {
  let validationSuccess: boolean = true;

  switch (schemaData.schema) {
    case 'email':
      const emailShema = z.string().email({ message: 'Invalid email address' });

      validationSuccess = emailShema.safeParse(schemaData.data).success;
      if (!validationSuccess) schemaData.result.email = '正しいメールアドレスを入力してください';

      break;
    case 'password':
      const passwordShema = z.string().min(1);

      validationSuccess = passwordShema.safeParse(schemaData.data).success;
      if (!validationSuccess) schemaData.result.password = 'パスワードを入力してください';

      break;
    case 'passwordConfirmation':
      if (schemaData.result.password === schemaData.result.passwordConfirmation)
        schemaData.result.password = 'パスワードが一致していません';
  }
};

export const formValidation = (inputData: inputData) => {
  const validationResult: validationResult = {
    invalid: false,
  };

  for (const [key, value] of Object.entries(inputData)) {
    createSchema({
      schema: key,
      data: value,
      result: validationResult,
    });
  }
  validationResult.invalid = Object.keys(validationResult).length > 1;

  return validationResult;
};
