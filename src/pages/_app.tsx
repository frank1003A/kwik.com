import "../../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
//import React, { useState, useEffect } from "react";
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <SessionProvider session={session}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
      </DndProvider>
    </SessionProvider>
  );
}

export default MyApp;

