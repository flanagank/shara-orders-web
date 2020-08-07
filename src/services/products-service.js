import axios from "axios";

export default class ProductsService {


    listAll() {


        var httpDeferred = axios({
            method: "GET",
            "url": "http://192.168.43.254:3333/products",
            headers: { "Content-Type": "application/json" }
        });

        return httpDeferred;

    }


}