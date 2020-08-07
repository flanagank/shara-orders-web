/* eslint-disable no-mixed-spaces-and-tabs */
<template>
    <div id="main" class="">

        <div class="row main-padding-top ">

      <div class="col-lg-3">
      <!-- TODO: put this in component -->
        <h1 class="my-3">My Account</h1>
           <div class="list-group">
                      <router-link class="list-group-item text-muted"  to="/cart"> <i class="fa fa-shopping-cart"></i>&nbsp;View Cart <span class="badge badge-success">0.00</span></router-link>
                      <router-link class="list-group-item text-muted"  to="/checkout"> <i class="fa fa-cart-arrow-down"></i>&nbsp;Checkout</router-link>
                      <router-link class="list-group-item text-muted"  to="/"> <i class="fa fa-chart-line"></i>&nbsp;Orders <span class="badge badge-success">1</span></router-link>
        </div>

      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-9">

<div class="row"><h3>Total : <span v-once> {{this.cart_total}} </span></h3></div>
        <div class="row">

           <article class="mb-2 w-100 mt-10" v-for="(item, id) in items" :key="id"  
                    v-bind:title="item.title"
                    v-bind:price="item.price"
                    v-bind:item_qty="item.item_qty"
                     >

            <div class="card h-100 cart" >
              <!-- <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a> -->
              <div class="card-body">
                <h4 class="card-title text-muted">
                  <a href="#" class="text-muted">{{ item.title }}</a>
                </h4>
                <h5>{{ item.price }}</h5>
                <p class="card-text">{{ item.quantity }} x {{ item.unit_price }}  <span class="right text-success">{{ item.line_total }}</span> </p>
              </div>
              <div class="card-footer">
                  <button type="button" class="btn btn-outline-danger btn-sm right" v-on:click="removeFromCart(item)">Remove</button> 
              </div>
            </div>
          </article>


        </div>
        <!-- /.row -->

      </div>
      <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->
    </div>
</template>

<script>

    export default {
        name: 'Cart',
        props: ['title','price','item_qty'],
        mounted () {
        this.getCart();
	},
  data() {

    
        return {
			lastDelY: 0,
			headerCollapsed: false,
			selectedTab: 0,
			selectedTabview: 0,
			items:  [],
			category: [
			],
			cart_items: [],
			cart_total:0.00
		};

	
	},
	methods: {
		search(){
			console.log('search')
        },getCart(){

                console.log('getCart')

var cart;

    //localStorage.removeItem("cart");

    if (localStorage.getItem("cart") === null) {
        //...

        cart = new Array();

    }else{

        cart = JSON.parse(localStorage.getItem("cart"));

    }

    if(cart.length > 0){

        //$('#cart_header span').html(cart.length + ' ITEMS');

    }else{

       // $('#cart_header span').html('0 ITEMS');

    }

    console.log(localStorage.getItem("cart"));

    var in_cart_total = 0.00 ;
    // eslint-disable-next-line no-mixed-spaces-and-tabs
    for(var i = 0; i < cart.length; i++)
    {

              console.log(cart[i])
							var obj = JSON.parse(cart[i]);
							//create flexible object to add item-qty
              // this.items.push({  id: obj.id,title: obj.title,unit_price: obj.price,quantity: obj.quantity })
              this.items.push(obj)
              in_cart_total = in_cart_total + parseFloat(obj.price) * parseFloat(obj.quantity)

    }
    
    this.cart_total = parseFloat(in_cart_total).toFixed(2)



    },
    addQuantity() {

                        console.log("Adding Qty")
                        this.item.item_qty = this.item.item_qty + 1

            },
             reduceQuantity() {

                        console.log("Reduce Qty")
                        var val = this.item.item_qty - 1
                        if(val < 1){
                            val = 1
                        }

                        this.item.item_qty = val

            }

    }
    }
</script>

<style scoped>
    #secure {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 20px;
        margin-top: 10px;
    }


    .input-item-qty{
        max-width: 50px;
        text-align: center;
        margin-right: 15px;
        float: right;
    }

    .right{
        float:right;
    }
</style>