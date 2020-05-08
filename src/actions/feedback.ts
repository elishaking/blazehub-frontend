import axios from "axios";
import app from "firebase/app";
import "firebase/database";
import { Feedback } from "../models/feedback";
import logError from "../utils/logError";

export const sendFeedback = async (feedbackData: Feedback) => {
  app.database().ref("feedback").push(feedbackData);

  return new Promise((resolve, reject) => {
    axios
      .post("/api/feedback/send", feedbackData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        logError(err);
        reject(err);
      });
  });
};
