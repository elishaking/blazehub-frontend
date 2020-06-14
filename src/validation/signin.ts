import { UserSigninData } from "../models/user";
import { isEmailValid } from "./email";
import { AuthErrors } from "../models/auth";

const requiredFieldMessage = (field: string) => `Your ${field} is required`;

const limitFieldMessage = (field: string, min = 5, max = 100) =>
  `Your ${field} should be between ${min}-${max} letters`;

export const validateSigninInput = (formData: UserSigninData) => {
  const errors = {} as AuthErrors;

  if (formData.email === "") errors.signinEmail = requiredFieldMessage("email");
  else if (!isEmailValid(formData.email))
    errors.signinEmail = "Your email is invalid";

  if (formData.password === "")
    errors.signinPassword = requiredFieldMessage("password");
  else if (formData.password.length < 5 || formData.password.length > 100)
    errors.signinPassword = limitFieldMessage("password");

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
