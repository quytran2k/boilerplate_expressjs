import { CustomHelpers } from 'joi';

const PASSWORD_IS_INVALID = 'Password must contain at least 1 letter and 1 number';
const PASSWORD_LENGTH_MUST_BE_MORE_THAN_8 = 'PASSWORD_LENGTH_MUST_BE_MORE_THAN_8';

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({ custom: PASSWORD_LENGTH_MUST_BE_MORE_THAN_8 });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({ custom: PASSWORD_IS_INVALID });
  }
  return value;
};
