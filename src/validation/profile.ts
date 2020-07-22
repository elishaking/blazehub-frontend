import { ProfileData, ErrorProfileData } from "../models/profile";

export const validateProfileInput = (formData: ProfileData) => {
  const errors: ErrorProfileData = {};

  if (formData.username === "") errors.username = "Your username is required";
  else if (formData.username.length < 5 || formData.username.length > 30)
    errors.username = "Your username should be between 5-30 characters";

  if (formData.name === "") errors.name = "Your name is required";
  else if (formData.name.length < 5 || formData.name.length > 30)
    errors.name = "Your name should be between 5-30 characters";

  if (
    formData.bio !== "" &&
    (formData.bio.length < 20 || formData.bio.length > 300)
  )
    errors.bio = "Your bio should be between 20-300 characters";

  if (formData.location && formData.location.length > 300)
    errors.location = "Your location should be less than 300 characters";

  if (formData.website && formData.website.length > 100)
    errors.website = "Your website should be less than 100 characters";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
