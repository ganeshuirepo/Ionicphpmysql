const PURE_EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Passwords should be at least 8 characters long and should contain one number, one character and one special character.
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const MOBILE_REGEXP = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const NUMBER_REGEXP = /^-?(0|[1-9]\d*)?$/;


export const regexValidators = {
  email: PURE_EMAIL_REGEXP,
  password: PASSWORD_REGEXP,
  mobile: MOBILE_REGEXP,
  number: NUMBER_REGEXP

};
