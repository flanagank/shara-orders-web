import axios from "axios";

export default class OrdersService {


    submitOrderHeader(new_order) {


        var httpDeferred = axios({
            url: "http://192.168.43.254:3333/orders",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(new_order)
        });

        return httpDeferred;

    }



    submitOrderDetails(order_details) {

        var httpDeferred = axios({
            url: "http://192.168.43.254:3333/orderdetails",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(order_details)
        });

        return httpDeferred;

    }
}