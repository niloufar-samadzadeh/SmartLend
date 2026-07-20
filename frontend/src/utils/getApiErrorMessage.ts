import axios from "axios";

type ApiErrorResponse = {
  message?: string;
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
};

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallback;
  }

  if (!error.response) {
    return "Unable to connect to the server. Please try again.";
  }

  const { status, data } = error.response;

  if (data?.errors) {
    const messages = Object.values(data.errors)
      .flat()
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.detail) {
    return data.detail;
  }

  if (status === 400) {
    return data?.title &&
      data.title !== "One or more validation errors occurred."
      ? data.title
      : "Please check the information you entered.";
  }

  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (status === 404) {
    return "The requested resource could not be found.";
  }

  if (status === 409) {
    return "An account with this email already exists.";
  }

  if (status === 422) {
    return "Some of the submitted information is invalid.";
  }

  if (status >= 500) {
    return "The server encountered an error. Please try again later.";
  }

  return data?.title || fallback;
}