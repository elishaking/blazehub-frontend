export const isEmailValid = (email: string) =>
  new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).test(email);

export const requiredFieldMessage = (field: string) =>
  `Your ${field} is required`;

export const limitFieldMessage = (field: string, min = 2, max = 100) =>
  `Your ${field} should be between ${min}-${max} letters`;
