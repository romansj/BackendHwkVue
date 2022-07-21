import http from "../http-common";
class PaymentService {
    getAll() {
        return http.get("/payment");
    }
    get(id) {
        return http.get(`/payment/${id}`);
    }
    create(data) {
        return http.post("/payment", data);
    }
    approve(token){
        return http.post(`/payment-approve?token=${token}`);
    }
}
export default new PaymentService();