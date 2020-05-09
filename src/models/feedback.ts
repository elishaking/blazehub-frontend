export interface Feedback {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackErrors extends Feedback {}
