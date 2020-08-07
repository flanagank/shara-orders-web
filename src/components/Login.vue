<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="input.username" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="input.password" />
            </div>

            <button type="button" class="btn btn-dark btn-lg btn-block" v-on:click="login()">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li><a href="#"><img src="../assets/images/logo_apple-app-store.svg" class="store-logo" /></a></li>
                    <li><a href="#"><img src="../assets/images/logo_play-store.png" class="store-logo" /></a></li>
                </ul>
            </div>

        </form>
    </div>
</template>



<script>
import AuthService from "../services/auth-service";
const authService = new AuthService();
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "fkhumbula@live.com",
                    password: "#pass123"
                }, user: {
                    username: "",
                    email: "fkhumbula@live.com",
                    mobile_number: "",
                    address: "",
                    password: "#pass123",
                    confirmPassword: ""
                }
            }
        },
        methods: {
            login() {
                
                if(this.input.username != "" && this.input.password != "") {
                this.user.email = this.input.username
                this.user.password = this.input.password


                authService.login(this.user)
                    .then(response => {
                        var result = response.data;

                        console.log(result)
         
                        //add response codes
                        
                        // eslint-disable-next-line no-prototype-builtins
                        if(result.hasOwnProperty('token')){
                           
                            this.processing = false;
                            localStorage.setItem("user", JSON.stringify(result));
                                 this.$emit("authenticated", true);
                                 this.$router.replace({ name: "main" });

                        // eslint-disable-next-line no-prototype-builtins
                        }else if(result.hasOwnProperty('message')){

                            alert(result.message)

                        }else{
                            alert('Could not login')
                        }
                  
                    })
                    .catch(error => {
                        this.processing = false;
                        alert(
                            "Unfortunately we could not find your account." + error
                        );
                    });

                  

                } else {
                    //use bootstrap alert
                    alert("A username and password must be present");
                }
            }
        }
    }
</script>