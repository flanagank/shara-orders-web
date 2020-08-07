/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div id="main" class="">
    <div class="row main-padding-top ">
      <div class="col-lg-3">
        <!-- TODO: put this in component -->
        <h1 class="my-3">My Account</h1>
        <div class="list-group">
          <router-link class="list-group-item text-muted" to="/cart">
            <i class="fa fa-shopping-cart"></i>&nbsp;View Cart
            <span class="badge badge-success">0.00</span></router-link
          >
          <router-link class="list-group-item text-muted" to="/checkout">
            <i class="fa fa-cart-arrow-down"></i>&nbsp;Checkout</router-link
          >
          <router-link class="list-group-item text-muted" to="/">
            <i class="fa fa-chart-line"></i>&nbsp;Orders
            <span class="badge badge-success">1</span></router-link
          >
        </div>
      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-9">
        <div class="row">
          <h3>
            Total : <span v-once> {{ this.cart_total }} </span>
          </h3>
        </div>

        <div class="row ">
          <div class="col-md-6">
            <div class="card h-100 cart">
              <div class="card-body">
                <h5>Email: {{ this.user.email }}</h5>
                <h4 class="card-title">
                  <a href="#" class="text-muted"
                    >Name: {{ this.user.username }}</a
                  >
                </h4>
                <h4 class="card-title text-muted">
                  Mobile Number: {{ this.user.mobile_number }}
                </h4>
                <h4 class="card-title text-muted">
                  Address: {{ this.user.address }}
                </h4>
                <div class="form-group">
                  <label class="card-title text-muted">Comment</label>
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    v-model="order_comment"
                  />
                </div>
              </div>
              <div class="card-footer">
                <button
                  type="button"
                  class="btn btn-dark btn-lg btn-block"
                  v-on:click="submitOrder()"
                >
                  Submit Order
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <article
              class="mb-2 w-100 mt-10"
              v-for="(item, id) in items"
              :key="id"
              v-bind:title="item.title"
              v-bind:price="item.price"
              v-bind:item_qty="item.item_qty"
            >
              <div class="card h-100 cart">
                <!-- <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a> -->
                <div class="card-body">
                  <h4 class="card-title text-muted">
                    <a href="#" class="text-muted">{{ item.title }}</a>
                  </h4>
                  <h5>{{ item.price }}</h5>
                  <p class="card-text">
                    {{ item.quantity }} x {{ item.unit_price }}
                    <span class="right text-success">{{
                      item.line_total
                    }}</span>
                  </p>
                </div>
                <!-- <div class="card-footer">
                  <button type="button" class="btn btn-outline-danger btn-sm right" v-on:click="removeFromCart(item)">Remove</button> 
              </div> -->
              </div>
            </article>
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.col-lg-9 -->
    </div>
    <!-- /.row -->
  </div>
</template>

<script>
import OrdersService from "../services/orders-service";
const ordersService = new OrdersService();
export default {
  name: "Checkout",
  props: ["title", "price", "item_qty"],
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getCart();
  },
  data() {
    return {
      lastDelY: 0,
      headerCollapsed: false,
      selectedTab: 0,
      selectedTabview: 0,
      items: [],
      category: [],
      cart_items: [],
      cart_total: 0.0,
      user: {},
      new_order: {
        order_number: "",
        order_status: "PENDING",
        order_location: "0,0",
        order_comment: "",
        order_total: 0.0,
        user_id: 0,
      },
      new_order_items: [],
      order_comment: "",
    };
  },
  methods: {
    search() {
      console.log("search");
    },
    getCart() {
      console.log("getCart");

      var cart;

      if (localStorage.getItem("cart") === null) {

        cart = new Array();

      } else {
        cart = JSON.parse(localStorage.getItem("cart"));
      }


      console.log(localStorage.getItem("cart"));

      var in_cart_total = 0.0;
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      for (var i = 0; i < cart.length; i++) {
        console.log(cart[i]);
        var obj = JSON.parse(cart[i]);
        //create flexible object to add item-qty
        // this.items.push({  id: obj.id,title: obj.title,unit_price: obj.price,quantity: obj.quantity })
        this.items.push(obj);
        in_cart_total =
          in_cart_total + parseFloat(obj.price) * parseFloat(obj.quantity);
      }

      this.cart_total = parseFloat(in_cart_total).toFixed(2);
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    showDetails() {},
    submitOrder() {
      //this can be done unique in backend or update number ofer getting ID
      //maybe source is needed, Web, App WO prefix will mean web order
      var new_order_number =
        "WO-" +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);
      new_order_number = new_order_number.toString().toUpperCase();
      this.new_order.order_number = new_order_number;
      this.new_order.order_total = this.cart_total;
      this.new_order.order_comment = this.order_comment;
      this.new_order.user_id = this.user.id;
      //this.new_order.order_location= GET USER GPS LOCATION;

      ordersService
        .submitOrderHeader(this.new_order)
        .then((response) => {
          var result = response.data;
          //add response codes //not full proof , can cause orphan record
          if (result.id > 0) {
            //alert(result.id)
            const new_order_id = result.id;
      var cart;

      if (localStorage.getItem("cart") === null) {
        cart = new Array();
      } else {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      console.log(localStorage.getItem("cart"));
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      for (var i = 0; i < cart.length; i++) {
        console.log(cart[i]);
        var obj = JSON.parse(cart[i]);
        this.new_order_items.push({
                      product_id: obj.id,
                      unit_price: parseFloat(obj.unit_price).toFixed(2),
                      quantity: obj.quantity,
                      line_total: parseFloat(obj.line_total).toFixed(2),
                      order_id: new_order_id,
                    });
 
      }

 // Start upload items

                  ordersService
                    .submitOrderDetails(this.new_order_items)
                    .then((response) => {
                 
                      var result = response.data;
                      //alert(result)
                      if (result.length > 0) {
                        console.log("Clear cart now");
                        localStorage.removeItem("cart")
                        alert("Your order has been submitted")
                        this.$router.replace({ name: "main" });
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  //End Upload Items



          } else {
            this.alert("Error! Invalid login details");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}

.input-item-qty {
  max-width: 50px;
  text-align: center;
  margin-right: 15px;
  float: right;
}

.right {
  float: right;
}
</style>
