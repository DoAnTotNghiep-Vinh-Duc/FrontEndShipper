import axios from "axios";
import Cookies from "js-cookie";

var header = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  Authorization: Cookies.get("tokenShipper"),
};

const axiosClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: header,
});

axiosClient.refreshToken = async () => {
  const refreshToken = Cookies.get("refreshTokenShipper");
  return (
    await axiosClient.post("/auth/verify-refresh-token", {
      refreshToken: refreshToken,
    })
  ).data.data;
};

axiosClient.setLocalAccessToken = async (accessToken, refreshToken) => {
  Cookies.set("tokenShipper", accessToken);
  Cookies.set("refreshTokenShipper", refreshToken);
};

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.authorization = Cookies.get("tokenShipper");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async function (reponse) {
    return reponse;
  },
  async function (error) {
    // console.log(error.response);
    const { config, status, data } = error.response;

    if (config.url === "/auth/signin-shipper" && status === 403) {
      const error = data.error;
      return Promise.reject(error);
    }

    if (status === 401) {
      if (data.error.message === "jwt expired") {
        console.log("Token hết hạn");

        const { accessToken, refreshToken } = await axiosClient.refreshToken();

        if (accessToken) {
          config.headers["authorization"] = accessToken;
          await axiosClient.setLocalAccessToken(accessToken, refreshToken);
          return axiosClient(config);
        }
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
