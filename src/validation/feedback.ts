import { FeedbackData } from "../models/feedback";
import { isEmailValid } from "./email";

/**
 * Validate feedback input
 */
export const validateFeedbackInput = (formData: FeedbackData) => {
  const errors = {} as FeedbackData;

  if (formData.name === "") errors.name = "Your name is required";
  else if (formData.name.length < 5 || formData.name.length > 30)
    errors.name = "Your name should be between 5-30 characters";

  if (formData.email === "") errors.email = "Your email is required";
  else if (!isEmailValid(formData.email))
    errors.email = "Please enter a valid email";
  else if (formData.email.length < 5 || formData.email.length > 30)
    errors.email = "Your email should be between 5-30 characters";

  if (formData.message === "") errors.message = "Your feedback is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
