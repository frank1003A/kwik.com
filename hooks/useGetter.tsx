import useSWR from 'swr';

import { fetcher } from '../lib/axios/axiosClient';

function useGetter (url: string) {
    const { data, error } = useSWR(url, fetcher)
  
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
  }

export default useGetter