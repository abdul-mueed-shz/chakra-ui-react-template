import React from "react";
import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";
import PageRouter from "./PageRouter";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/index"; // Import your Redux store

const theme = extendTheme({});

export default function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
        <CSSReset />
        <ToastContainer />
        <PageRouter />
      </ChakraProvider>
    </Provider>
  );
}
