import { UserSigninData } from "../models/user";
import { isEmailValid, requiredFieldMessage, limitFieldMessage } from "./utils";
import { AuthErrors } from "../models/auth";

export const validateSigninInput = (formData: UserSigninData) => {
  const errors: AuthErrors = {};

  if (formData.email === "") errors.signinEmail = requiredFieldMessage("email");
  else if (!isEmailValid(formData.email))
    errors.signinEmail = "Your email is invalid";

  if (formData.password === "")
    errors.signinPassword = requiredFieldMessage("password");
  else if (formData.password.length < 5 || formData.password.length > 100)
    errors.signinPassword = limitFieldMessage("password", 5);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
