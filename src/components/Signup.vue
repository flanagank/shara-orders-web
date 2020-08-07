<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign Up</h3>
<div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

 <div class="form-group">
                <label>Mobile Number</label>
                <input type="text" class="form-control form-control-lg" v-model="user.mobile_number"/>
            </div>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control form-control-lg" v-model="user.username"/>
            </div>

            

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password"/>
            </div>

               <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.confirm_password"/>
            </div>

            <button type="button" class="btn btn-dark btn-lg btn-block" v-on:click="register()">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>

<script>

import AuthService from "../services/auth-service";
const authService = new AuthService();

    export default {
        data() {
           return {
                user: {
                    username: "",
                    email: "",
                    mobile_number: "",
                    address: "",
                    password: "",
                    confirm_password: ""
                }
            }
        }, methods: {
            register() {
                
                if(this.user.email != "" && this.user.password != "") {
                // this.user.email = this.input.username
                // this.user.password = this.input.password

                  if (this.user.password != this.user.confirm_password) {
                    alert("Your passwords do not match.");
                    this.processing = false;
                    return;
                }


                authService.register(this.user)
                    .then(response => {
                        var result = response.data;

                        console.log(result)
         
                            //add response codes
                            // eslint-disable-next-line no-prototype-builtins
                            if(result.hasOwnProperty('message') ){
                                
                               alert(result.message);
                                
                            }else{

                                alert(
                                    "Account created, Please login" 
                                );
                                 this.$router.replace({ name: "login" });

                            }
                  
                    })
                    .catch(error => {
                        // this.processing = false;
                        alert(
                            "Unfortunately we could create your account." + error
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