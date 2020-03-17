import { captureException } from "@sentry/browser";

export default function logErrorFunction(err: any) {
  if (process.env.NODE_ENV === "development") {
    return console.error(err);
  } else if (process.env.NODE_ENV === "production") {
    return captureException(err);
  }
}
