import { UserSignupData } from "../models/user";
import { isEmailValid, requiredFieldMessage, limitFieldMessage } from "./utils";
import { AuthErrors } from "../models/auth";

export const validateSignupInput = (formData: UserSignupData) => {
  const errors: AuthErrors = {};

  if (formData.email === "") errors.email = requiredFieldMessage("email");
  else if (!isEmailValid(formData.email))
    errors.email = "Your email is invalid";

  if (formData.firstName === "")
    errors.firstName = requiredFieldMessage("first name");
  else if (formData.firstName.length < 2 || formData.firstName.length > 100)
    errors.firstName = limitFieldMessage("first name");

  if (formData.lastName === "")
    errors.lastName = requiredFieldMessage("last name");
  else if (formData.lastName.length < 2 || formData.lastName.length > 100)
    errors.lastName = limitFieldMessage("last name");

  if (formData.password === "")
    errors.password = requiredFieldMessage("password");
  else if (formData.password.length < 5 || formData.password.length > 100)
    errors.password = limitFieldMessage("password", 5);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
