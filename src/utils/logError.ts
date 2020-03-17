import { captureException } from "@sentry/browser";

export default function logErrorFunction() {
  if (process.env.NODE_ENV === "development") {
    return console.error;
  } else if (process.env.NODE_ENV === "production") {
    return captureException;
  }
}
