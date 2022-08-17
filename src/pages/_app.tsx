import "../../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
//import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { createGlobalStyle } from 'styled-components'

// Your themeing variables
const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #555;
    --bg: #eee;
    --cd: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
    --cd: #555;
  }
` 

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
    <GlobalStyle/>
      <SessionProvider session={session}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider enableSystem={false}>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </DndProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
