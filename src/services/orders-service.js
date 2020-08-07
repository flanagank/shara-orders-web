import axios from "axios";

export default class OrdersService {


    submitOrderHeader(new_order) {


        var httpDeferred = axios({
            url: localStorage.getItem("API_URL") + "/orders",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(new_order)
        });

        return httpDeferred;

    }



    submitOrderDetails(order_details) {

        var httpDeferred = axios({
            url: localStorage.getItem("API_URL") + "/orderdetails",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify(order_details)
        });

        return httpDeferred;

    }
}