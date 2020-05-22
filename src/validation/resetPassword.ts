import { ResetPasswordData } from "../models/auth";

/**
 * Validate input
 */
export const validateResetPasswordInput = (formData: ResetPasswordData) => {
  const errors = {} as ResetPasswordData;

  if (formData.password === "")
    errors.password = "Your new password is required";
  else if (formData.password.length < 7 || formData.password.length > 30)
    errors.password = "Your new password should be between 7-30 characters";

  if (formData.confirmPassword !== formData.password)
    errors.confirmPassword = "Passwords must match";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
