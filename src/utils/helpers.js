export function validateEmail(email) {
  if (!email) {
    return 'Email is required';
  }
  //Check email regex
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email';
  }
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }
}

export function validateEmailPassword(email, password) {
  const msg = validateEmail(email);

  if (msg) {
    return msg;
  }

  return validatePassword(password);
}