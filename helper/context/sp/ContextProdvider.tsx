import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import productsClass from "../../../model/products";

interface ContextObj {
    sProducts?: productsClass[],
    setSelProduct?: Dispatch<SetStateAction<productsClass[]>>
}
 
export const ProductSelectedContext = createContext<ContextObj>({})

type ContextProps = {
    children: ReactNode,
}

export const ContextProvider = ({children}: ContextProps) => {
    //products
    const [sProducts, setSelProduct] = useState<productsClass[]>([]) 
    const spContext: ContextObj = { sProducts, setSelProduct }

    return <ProductSelectedContext.Provider value={spContext}>{children}</ProductSelectedContext.Provider>
}