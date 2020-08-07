import axios from "axios";

export default class AuthService {

    isLoggedIn() {
        return false;
    }

    login(user) {

        console.log(user.email)
        var httpDeferred = axios({
            method: "POST",
            "url": "http://192.168.43.254:3333/login",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });



        return httpDeferred;

    }

    logout() {
        //appSettings.setString("user", "");
        return true;
    }

    register(new_user) {

        var httpDeferred = axios({
            url: "/register",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                username: new_user.email,
                email: new_user.email,
                mobile_number: new_user.mobile_number,
                address: new_user.address,
                password: new_user.password
            })
        });

        return httpDeferred;

    }
}