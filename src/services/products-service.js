import axios from "axios";

export default class ProductsService {


    listAll() {


        var httpDeferred = axios({
            method: "GET",
            "url": localStorage.getItem("API_URL") + "/products",
            headers: { "Content-Type": "application/json" }
        });

        return httpDeferred;

    }


}