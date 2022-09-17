import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
    baseURL: "https://kwik-mini-invoice-generator-owu0nhna5-frank1003a.vercel.app",
  });

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['Accept'] = 'application/json'

//api.defaults.timeout = 2000


/**@alias `getRequest` axios get request base config */
export const getRequest = async (URL: string) => {
    const response = await api.get(`/${URL}`);
    return response.data;
}

/**@alias `postRequest` axios post request base config */
export const postRequest = async (URL: string, payload: any ) => {
    const response = await api.post(`/${URL}`, payload);
    return response;
}

/**@alias `patchRequest` axios patch request base config */
export const patchRequest = async (URL: string, payload: any ) => {
    const response = await api.patch(`/${URL}`, payload).then(response => response);
    return response;
  }
  
/**@alias `deleteRequest` axios delete request base config: url + id*/
export const deleteRequest = async(URL: string) => {
    const response = await api.delete(`/${URL}`).then(response => response);
    return response;
}

/**SWR fetcher */
export const fetcher = (url: string) => api.get(url).then(res => res.data)
