<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="#" target="_blank">
          <i class="fa fa-shopping-cart"></i> 
          SHARA ORDERS
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" v-if="!authenticated"  to="/login" > <i class="fa fa-user"></i>  Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-danger" v-if="!authenticated" to="/signup"> <i class="fa fa-check"></i>&nbsp;Sign up</router-link>
               <router-link class="btn btn-outline-danger" v-if="authenticated" to="/login" v-on:click.native="logout()" >&nbsp;Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div  v-bind:class="[authenticated ? loggedBlockClass : '', notloggedBlockClass]" >
          <router-view @authenticated="setAuthenticated" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    username: "fkhumbula@live.com",
                    password: "#pass123"
                },
                 notloggedBlockClass: 'inner-block',
                 loggedBlockClass: 'inner-block-main'
            }
        },
        mounted() {
            if(!this.authenticated) {
                this.$router.replace({ name: "login" });
            }else{
              this.$router.replace({ name: "main" });
               this.$router.push({ name: "main" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>