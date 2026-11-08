import type { ApiError, ApiErrorDetails, ValidationError } from "@/lib/api/types";

export function createApiError({
  status,
  message,
  details,
  code,
  fieldErrors,
}: {
  status: number;
  message: string;
  details?: unknown;
  code?: string;
  fieldErrors?: ValidationError[];
}): ApiError {
  const error = new Error(message) as ApiError;

  error.name = "ApiError";
  error.status = status;
  error.code = code;
  error.details = details;
  error.fieldErrors = fieldErrors;
  error.userMessage = getUserFacingMessage(status, message);

  return error;
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === "object" && error !== null && "status" in error && "userMessage" in error;
}

export function getUserFacingMessage(status: number, fallbackMessage: string) {
  const normalizedMessage = fallbackMessage.trim() || "Something went wrong.";

  switch (status) {
    case 400:
      return "The request could not be processed. Please review the information and try again.";
    case 401:
      return "Your session is no longer valid. Please sign in again.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource could not be found.";
    case 409:
      return "This request conflicts with the current state. Please refresh and try again.";
    case 422:
      return "The submitted details are invalid. Please fix the highlighted fields and retry.";
    case 429:
      return "Too many requests were sent. Please wait a moment and try again.";
    case 500:
      return "The server is currently unavailable. Please try again in a moment.";
    default:
      return normalizedMessage;
  }
}

export function normalizeApiError(payload: unknown, fallbackStatus = 500): ApiError {
  const details = payload as ApiErrorDetails;
  const status = typeof details?.status === "number" ? details.status : fallbackStatus;
  const message = details?.message || getUserFacingMessage(status, "Request failed.");
  const fieldErrors = Array.isArray(details?.fieldErrors)
    ? details.fieldErrors
    : Array.isArray((payload as { errors?: unknown })?.errors)
      ? ((payload as { errors: ValidationError[] }).errors ?? [])
      : [];

  return createApiError({
    status,
    message,
    code: details?.code,
    fieldErrors,
    details: payload,
  });
}
