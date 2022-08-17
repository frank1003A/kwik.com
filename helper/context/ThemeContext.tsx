import { createContext, Dispatch, ReactNode, SetStateAction, useState, useMemo } from "react";
import { useTheme, createTheme, ThemeProvider, PaletteOptions } from "@mui/material/styles";

export interface ContextObj {
    theme?: "light" | "dark",
    toggleColorMode?: () => void;
}
 
export const ColorModeContext = createContext<ContextObj>({})

type ContextProps = {
    children: ReactNode,
}

export const ThemeContextProvider = ({children}: ContextProps) => {
    //
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = useMemo(
        () => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          },
        }),
        [],
      );
      
      const theme = useMemo(
        () =>
          createTheme({
            palette:  {
              mode,
              ...(mode === "dark" ?{
                text: {
                  primary: "#fff",
                },
                background: {
                  default: "#0c0c0c"
                },
              } : {
                text: {
                  primary: "#555",
                },
                background: {
                  default: "#0c0c0c"
                }
              } )
            },
          }),
        [mode],
      );

      return (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </ColorModeContext.Provider>
    )
    
}
