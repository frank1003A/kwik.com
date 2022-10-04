import axios, { AxiosInstance } from "axios";

export let baseRoute: string = ""

if (process.env.NODE_ENV === "development") {
  baseRoute = "http://localhost:3000"
} else {
  baseRoute = "https://kwik-mini-invoice-generator.vercel.app"
}

export const api: AxiosInstance = axios.create({
    baseURL: baseRoute,
  });

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['Accept'] = 'application/json'

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
