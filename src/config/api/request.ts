import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export default async function request(url, method, payload) {
  const axiosConfig = {
    method,
    url,
    data: payload || null,
    headers: {'Content-Type': 'application/json'},
  };

  const axiosInstance = axios.create();
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async error => {
      const errorResponse = error.response;
      console.log(error);
      return errorResponse;
    },
  );

  axiosInstance.interceptors.request.use((reqWithUser: AxiosRequestConfig) => {
    return reqWithUser;
  });

  const responsePromise = axiosInstance.request(axiosConfig);
  return responsePromise;
}
