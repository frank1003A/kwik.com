import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import clients from "../../../model/clients";

interface ClientContextObj {
   cInvoice?: clients,
   setCInvoice?: Dispatch<SetStateAction<clients>>
}

export const CustomerSelectedContext = createContext<ClientContextObj>({})

type ContextProps = {
    children: ReactNode,
}

export const ClientContextProvider = ({children}: ContextProps) => {
    //one client invoice generator
    const [cInvoice, setCInvoice] = useState<clients>({})
    const cIContext: ClientContextObj = {cInvoice, setCInvoice}

    return <CustomerSelectedContext.Provider value={cIContext}>{children}</CustomerSelectedContext.Provider>
}