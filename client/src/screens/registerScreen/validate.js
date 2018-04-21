import { validate as EmailValidator } from 'email-validator';
import PasswordValidator from 'password-validator';

const pwSchema = new PasswordValidator();

pwSchema
  .is()
  .min(8)
  .is()
  .max(20)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits();

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!EmailValidator(values.email)) {
    errors.email = 'A valid email address is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!pwSchema.validate(values.password)) {
    errors.password = 'Must be at least 8 characters including uppercase, lowercase and a number';
  }

  return errors;
};

export default validate;
