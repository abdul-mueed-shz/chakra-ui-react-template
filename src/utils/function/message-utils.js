import { showToast } from "@components/common/toast";

export const handleGlobalMessages = (message, type="success") => {
  showToast(message, type);
};

export const handleGlobalErrors = (errors, customMessage = "Something went wrong!") => {
  if (typeof errors === "string") {
    showToast(errors, "error");
    return;
  } else if (Array.isArray(errors)) {
    for (const error of errors) {
      handleGlobalErrors(error);
    }
    return;
  } else if (typeof errors === "object") {
    for (const key in errors) {
      handleGlobalErrors(errors[key]);
    }
    return;
  }
  showToast(customMessage, "error");
  return;
};
