import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import CustomLoader from './CustomLoader';

const Loading = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => (url !== router.pathname) && setLoading(true);
        const handleComplete = (url: string) => (url === router.pathname) && setLoading(false);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    
    return loading && (
        <CustomLoader
        text='We are working on it'
        />
    )
}

export default Loading
