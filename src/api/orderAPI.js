import axiosClient from "./axiosClient";

const orderAPI = {
  getAllOrderByShipper(statusOrder) {
    const url = "/order/get-order-by-shipper";
    return axiosClient.get(url, {
      params: {
        statusOrder,
      },
    });
  },
  getOrderByOrderId(orderId) {
    const url = `/order/get-order-by-orderId/${orderId}`;
    return axiosClient.get(url);
  },
};

export default orderAPI;
