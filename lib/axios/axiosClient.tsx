import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.post['Accept'] = 'application/json'

//api.defaults.timeout = 2000


//get request
export const getRequest = async (URL: string) => {
    const response = await api.get(`/${URL}`);
    return response.data;
}

//post request
export const postRequest = async (URL: string, payload: any ) => {
    const response = await api.post(`/${URL}`, payload);
    return response.data;
}