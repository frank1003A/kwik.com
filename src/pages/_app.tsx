import "../../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
//import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
//import { useRouter } from "next/router";
//import { BeatLoader } from "react-spinners";

function MyApp({ Component, pageProps }: AppProps) {
  /**const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const bg: React.CSSProperties = {
    display: "flex",
    width: "100%",
    height: "100vh",
    alignItems: "center",
  }

  const override: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  <div style={bg}>
  <BeatLoader
    color="red"
    loading={loading}
    cssOverride={override}
    size={80}
  />
  </div> */

  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </DndProvider>
  );
}

export default MyApp;
