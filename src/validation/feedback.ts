import { Feedback, FeedbackErrors } from "../models/feedback";

/**
 * Validate feedback input
 */
export const validateFeedbackInput = (formData: Feedback) => {
  const errors: FeedbackErrors = {} as FeedbackErrors;

  if (formData.name === "") errors.name = "Your name is required";
  else if (formData.name.length < 5 || formData.name.length > 30)
    errors.name = "Your name should be between 5-30 characters";

  if (formData.email === "") errors.email = "Your email is required";
  else if (
    !new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(formData.email)
  )
    errors.email = "Please enter a valid email";
  else if (formData.email.length < 5 || formData.email.length > 30)
    errors.email = "Your email should be between 5-30 characters";

  if (formData.message === "") errors.message = "Your feedback is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
