import React, {useEffect, useState} from 'react'
import { getRequest } from '../lib/axios/axiosClient'

/**const useFetch = () => {
    const [data, setData] = useState<{keyword: string, result: []}>({
        keyword:"",
        result: []
    })

    useEffect(() => {
        if (data.keyword !== ""){
            const timeoutId = setTimeout(() => {
                const fetch = async () => {
                    try {
                        const invoices = await getRequest( "api/invoices");
                        const res = invoices.filter(dta => )
                    } catch (error: any) {
                        
                    }
                }
            }, 2000)
        }
    }, [data.keyword])
  return {data, setData}
} */