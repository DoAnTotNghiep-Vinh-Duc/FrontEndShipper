import axiosClient from "./axiosClient";

const userAPI = {
  signIn(email, password) {
    const url = "/auth/signin-shipper";
    return axiosClient.post(url, email, password);
  },
  logout(refreshToken) {
    const url = "/auth/logout";
    return axiosClient.post(url, refreshToken);
  },
  getInformation() {
    const url = "/information";
    return axiosClient.get(url);
  },
};

export default userAPI;
