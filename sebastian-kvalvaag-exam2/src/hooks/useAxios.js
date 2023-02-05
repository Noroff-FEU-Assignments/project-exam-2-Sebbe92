import { useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext.js";

const url = "https://api.noroff.dev/api/v1/social/";

export default function useAxios() {
  const [user] = useContext(UserContext);

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = user ? user.accessToken : "";
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  });

  return apiClient;
}
