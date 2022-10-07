import useSWR from 'swr';

import { fetcher } from '../lib/axios/axiosClient';

function useGetter (url: string) {
    const { data, error, mutate } = useSWR(url, fetcher)
  
    return {
      data: data,
      mutate: mutate,
      isLoading: !error && !data,
      isError: error
    }
  }

export default useGetter