export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  //name
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  //email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  //password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  //confirmPassword
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  //dateOfBirth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',
  //user
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'register success',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  USER_NOT_FOUND: 'Uer banned',
  USER_BANNED: 'Uer banened',
  EMAIL_VERIFY_TOKEN_NOT_MATCH: 'Email verify token not match',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'EMAIL ALREADY VERIFIED BEFORE',
  EMAIL_VERIFY_SUCCESS: 'EMAIL VERIFY SUCCESS',
  REFRESH_EMAIL_VERIFY_SUCCESS: 'REFRESH_EMAIL_VERIFY_SUCCESS',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'CHECK EMAIL TO RESET PASSWORD',
  INVALID_FORGOT_PASSWORD_TOKEN: 'INVALID FORGOT PASSWORD TOKEN',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'FORGOT PASSWORD TOKEN IS REQUIRED',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS',
  RESET_PASSWORD_SUCCESS: 'Reset password success'
} as const
