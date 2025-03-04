import { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleGlobalErrors } from "../function/message-utils";

export const useError = () => {
  const globalError = useSelector((state) => state.message.error);
  useEffect(() => {
    handleGlobalErrors(globalError);
  }, [globalError]);
};
