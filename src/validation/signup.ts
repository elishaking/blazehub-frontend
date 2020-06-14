import { UserSignupData } from "../models/user";
import { isEmailValid } from "./email";
import { AuthErrors } from "../models/auth";

const requiredFieldMessage = (field: string) => `Your ${field} is required`;

const limitFieldMessage = (field: string, min = 5, max = 100) =>
  `Your ${field} should be between ${min}-${max} letters`;

export const validateSignupInput = (formData: UserSignupData) => {
  const errors = {} as AuthErrors;

  if (formData.email === "") errors.email = requiredFieldMessage("email");
  else if (!isEmailValid(formData.email))
    errors.email = "Your email is invalid";

  if (formData.firstName === "")
    errors.firstName = requiredFieldMessage("firstName");
  else if (formData.firstName.length < 5 || formData.firstName.length > 100)
    errors.firstName = limitFieldMessage("firstName");

  if (formData.lastName === "")
    errors.lastName = requiredFieldMessage("lastName");
  else if (formData.lastName.length < 5 || formData.lastName.length > 100)
    errors.lastName = limitFieldMessage("lastName");

  if (formData.password === "")
    errors.password = requiredFieldMessage("password");
  else if (formData.password.length < 5 || formData.password.length > 100)
    errors.password = limitFieldMessage("password");

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
