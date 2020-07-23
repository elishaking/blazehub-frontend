import axios from "axios";
import app from "firebase/app";
import "firebase/database";

import { FeedbackData } from "../../models/feedback";
import { logError } from "../../utils/logError";

export const sendFeedback = async (feedbackData: FeedbackData) => {
  try {
    await app.database().ref("feedback").push(feedbackData);
    await axios.post("/feedback", feedbackData);
  } catch (err) {
    logError(err.response);
    return { success: false, message: err.response.message };
  }

  return { success: true };
};
