import axios from "axios";

const axiosInstance = axios.create({ withCredentials: true });

const apiConnector = (method, url, data, params, headers) => {
  return axiosInstance({
    method,
    url,
    data: data ? data : null,
    params: params ? params : null,
    headers: headers ? headers : null,
  });
};

export { apiConnector };
