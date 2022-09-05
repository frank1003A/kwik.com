import '../../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { ReactElement, ReactNode, useState } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { store } from '../redux/store';
import Loading from '../../components/asset/Loading';
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
`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
    return (
      <>
      <Loading/>
      <GlobalStyle />
        <SessionProvider session={session}>
          <DndProvider backend={HTML5Backend}>
            <ThemeProvider enableSystem={false}>
              <Provider store={store}>
              {getLayout(
                   <Component {...pageProps} />
              )}
              </Provider>
            </ThemeProvider>
          </DndProvider>
        </SessionProvider>
      </>
    )
}

export default MyApp;