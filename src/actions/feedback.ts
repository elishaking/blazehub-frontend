// import axios from "axios";
import app from "firebase/app";
import "firebase/database";
import { FeedbackData } from "../models/feedback";
import { logError } from "../utils/logError";

export const sendFeedback = async (feedbackData: FeedbackData) => {
  try {
    await app.database().ref("feedback").push(feedbackData);
  } catch (err) {
    logError(err);
    return { success: false };
  }

  return { success: true };

  // return new Promise((resolve, reject) => {
  //   axios
  //     .post("/api/feedback/send", feedbackData)
  //     .then((res) => {
  //       resolve(res.data);
  //     })
  //     .catch((err) => {
  //       logError(err);
  //       reject(err);
  //     });
  // });
};
