import { captureException } from "@sentry/browser";

export default function logError(err: any) {
  captureException(err);
}
