<template>
    <div id="main" class="">

        <div class="row main-padding-top ">

      <div class="col-lg-3">

        <h1 class="my-3">My Account</h1>
     <div class="list-group">
                      <router-link class="list-group-item text-muted"  to="/cart"> <i class="fa fa-shopping-cart"></i>&nbsp;View Cart <span class="badge badge-danger">0.00</span></router-link>
                      <router-link class="list-group-item text-muted"  to="/checkout"> <i class="fa fa-cart-arrow-down"></i>&nbsp;Checkout</router-link>
                      <router-link class="list-group-item text-muted"  to="/"> <i class="fa fa-chart-line"></i>&nbsp;Orders <span class="badge badge-success">1</span></router-link>
        </div>

      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-9">


        <div class="row">

           <div class="col-lg-4 col-md-6 mb-4" v-for="(item, id) in items" :key="id"  
                    v-bind:title="item.title"
                    v-bind:price="item.price"
                    v-bind:item_qty="item.item_qty"
                    v-on:add="alert(item.item_qty)">

            <div class="card h-100 " >
              <!-- <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a> -->
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">{{ item.title }}</a>
                </h4>
                <h5>{{ item.price }}</h5>
                <p class="card-text">{{ item.description }}</p>
              </div>
              <div class="card-footer">
                <small class="text-danger">{{ item.status }}</small>   <button type="button" class="btn btn-outline-danger btn-sm right" v-on:click="addToCart(item)">Add</button> <input type="number" class="input-item-qty" :value="item.item_qty" />
              </div>
            </div>
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
import ProductsService from "../services/products-service";
const productsService = new ProductsService();
    export default {
        name: 'Main',
        props: ['title','price','item_qty'],
        mounted () {
        this.getProducts();
      

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
        },getProducts(){

                console.log('getProducts')

                productsService.listAll()
                    .then(response => {

                        console.log(response)
                        var result = response.data;

						console.log(JSON.stringify(result))

 
						for (var i = 0; i < result.length; i++){
							var obj = result[i];
							console.log(obj.title)
							//create flexible object to add item-qty
							this.items.push({  id: obj.id,sku: obj.sku,title: obj.title,description: obj.description,price: obj.price,status: obj.status,category_id: obj.category_id,item_qty: 1 })

						}
					
                       // this.items =  result
                  
                    })
                    .catch(error => {
                        console.log(error)
                        this.items =  []
                    });

		},addToCart(item) {

                        console.log("Adding to cart")

                        // eslint-disable-next-line no-unused-vars
                        var cart ;

                      
                        if(item.item_qty==0){

                            alert('Quantity cannot be 0 ');

                            return;

                        }

                        if (localStorage.getItem("cart") === null) {
                            //...

                            cart = new Array();

                        }else{

                            cart = JSON.parse(localStorage.getItem("cart"));

                        }


                       const line_total = item.price * item.item_qty;

                        // eslint-disable-next-line no-unused-vars
                        var  cart_item = JSON.stringify({id: item.id, title: item.title ,unit_price:item.price , quantity:item.item_qty , line_total:line_total});

                        cart.push(cart_item);

                        console.log(cart_item)

                        localStorage.setItem("cart",JSON.stringify(cart));
                        console.log(JSON.stringify(cart))

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