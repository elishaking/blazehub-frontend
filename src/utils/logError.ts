import { captureException } from "@sentry/browser";

export default function logError(err: any) {
  if (process.env.NODE_ENV === "production") {
    captureException(err);
  } else {
    console.error(err);
  }
}
