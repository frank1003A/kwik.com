import "../../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
//import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { store } from "../redux/store";
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
    --sw: #2124b1;
    --txt: rgba(0, 17, 255, 0.164);
    --prp: #fff;
    --card-box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #27272f;
    --cd: #555;
    --sw: orange;
    --txt: grey;
    --prp: #27272f;
    --card-box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 
    0px 4px 5px 0px rgb(0 0 0 / 14%), 
    0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
` ;

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
