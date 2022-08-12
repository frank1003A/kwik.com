import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";


export interface ContextObj {
    theme?: {
        dark?: {},
        light?: {}
    },
    setTheme?: Dispatch<SetStateAction<{}>>
}
 
export const ThemeSelectedContext = createContext<ContextObj>({})

type ContextProps = {
    children: ReactNode,
}

export const ThemeContextProvider = ({children}: ContextProps) => {
    //products
    const [theme, setTheme] = useState<{}>([]) 
    const themeContext: ContextObj = { theme, setTheme }

    return <ThemeSelectedContext.Provider value={themeContext}>{children}</ThemeSelectedContext.Provider>
}