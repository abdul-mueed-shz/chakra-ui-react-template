import { useEffect } from "react";
import { useSelector } from "react-redux";
import { handleGlobalMessages } from "../function/message-utils";

export const useMessage = () => {
  const globalMessage = useSelector((state) => state.message.message);

  useEffect(() => {
    handleGlobalMessages(globalMessage);
  }, [globalMessage]);
};
