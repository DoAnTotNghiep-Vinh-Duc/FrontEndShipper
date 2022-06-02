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
  receiveOrder(orderId) {
    const url = "/shipper/receive-order";
    return axiosClient.post(url, { orderId });
  },
  successOrder(orderId) {
    const url = "/shipper/finish-order";
    return axiosClient.post(url, { orderId });
  },
};

export default orderAPI;
