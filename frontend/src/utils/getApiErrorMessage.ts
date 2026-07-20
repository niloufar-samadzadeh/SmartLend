import axios from "axios";

type ValidationProblemDetails = {
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
};

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (!axios.isAxiosError<ValidationProblemDetails>(error)) {
    return fallback;
  }

  const data = error.response?.data;

  if (!data) {
    return error.message || fallback;
  }

  if (data.errors) {
    const messages = Object.values(data.errors).flat();

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  if (data.detail) {
    return data.detail;
  }

  if (data.title) {
    return data.title;
  }

  return fallback;
}