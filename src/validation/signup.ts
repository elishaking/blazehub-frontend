import { UserSignupData } from "../models/user";
import { isEmailValid, requiredFieldMessage, limitFieldMessage } from "./utils";
import { AuthErrors } from "../models/auth";

export const validateSignupInput = (formData: UserSignupData) => {
  const errors = {} as AuthErrors;

  if (formData.email === "") errors.email = requiredFieldMessage("email");
  else if (!isEmailValid(formData.email))
    errors.email = "Your email is invalid";

  if (formData.firstName === "")
    errors.firstName = requiredFieldMessage("firstName");
  else if (formData.firstName.length < 2 || formData.firstName.length > 100)
    errors.firstName = limitFieldMessage("firstName");

  if (formData.lastName === "")
    errors.lastName = requiredFieldMessage("lastName");
  else if (formData.lastName.length < 2 || formData.lastName.length > 100)
    errors.lastName = limitFieldMessage("lastName");

  if (formData.password === "")
    errors.password = requiredFieldMessage("password");
  else if (formData.password.length < 5 || formData.password.length > 100)
    errors.password = limitFieldMessage("password", 5);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
