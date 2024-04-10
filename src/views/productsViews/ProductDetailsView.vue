<template>
<!-- <div class="product">
    <div class="product-img">
        <img :src="SelectedProduct.Image" alt="">
    </div>
    <div class="product-info">
        <h2>{{ SelectedProduct.ProductName }}</h2>
        <p>{{ SelectedProduct.ProductDescription }}</p>
        <div>
            {{ SelectedProduct.RetailPrice }} Ft
        </div>
    </div>
</div> -->


<div class = "card-wrapper">
      <div class = "card">
        <!-- card left -->
        <div class = "product-imgs">
          <div class = "img-display">
            <div class = "img-showcase">
              <img :src="SelectedProduct.Image" alt = "shoe image">

            </div>
          </div>

        </div>
        <!-- card right -->
        <div class = "product-content">
          <h2 class = "product-title">{{ SelectedProduct.ProductName }}</h2>
         
         

          <div class = "product-price">
            <p class = "price">Ár: <span>{{ SelectedProduct.RetailPrice }} Ft</span></p>
          </div>

          <div class = "product-detail">
            <h2>Termék leírás: </h2>
            <p>{{ SelectedProduct.ProductDescription }}</p>
            <ul>
              
              <li>Raktáron: <span>{{ SelectedProduct.QuantityOnHand }} db</span></li>
              <li>Kategória: <span></span></li>
              <li>Szállítás: <span>Belföldön bárhova.</span></li>
              <li>Szállítási költség: <span>{{SelectedProduct.sza}}</span></li>
            </ul>
          </div>

          <div class = "purchase-info">
            <input type = "number" min = "0" value = "1">
            <button type = "button" class = "btn">
              Add to Cart <i class = "fas fa-shopping-cart"></i>
            </button>
            
          </div>

          
        </div>
      </div>
    </div>



</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useShoppingStore  } from "../../stores/shoppingStore";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedCategory = ref(null);

const store = useShoppingStore()
const rout = useRoute();



const SelectedProduct = computed(() => {
  return store.products.find(
    (product) => product.ProductName === rout.params.ProductName
  );
});




</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap');

*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
}
body{
    line-height: 1.5;
}
.card-wrapper{
    max-width: 1100px;
    margin: 0 auto;
}
img{
    width: 100%;
    display: block;
}
.img-display{
    overflow: hidden;
}
.img-showcase{
    display: flex;
    width: 100%;
    transition: all 0.5s ease;
}
.img-showcase img{
    min-width: 100%;
}
.img-select{
    display: flex;
}
.img-item{
    margin: 0.3rem;
}
.img-item:nth-child(1),
.img-item:nth-child(2),
.img-item:nth-child(3){
    margin-right: 0;
}
.img-item:hover{
    opacity: 0.8;
}
.product-content{
    padding: 2rem 1rem;
}
.product-title{
    font-size: 3rem;
    text-transform: capitalize;
    font-weight: 700;
    position: relative;
    color: #12263a;
    margin: 1rem 0;
}
.product-title::after{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    width: 80px;
    background: #12263a;
}

.product-link:hover{
    opacity: 0.9;
}


.product-price{
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: 700;
}
.product-price span{
    font-weight: 400;
}


.product-detail h2{
    text-transform: capitalize;
    color: #12263a;
    padding-bottom: 0.6rem;
}
.product-detail p{
    font-size: 0.9rem;
    padding: 0.3rem;
    opacity: 0.8;
}
.product-detail ul{
    margin: 1rem 0;
    font-size: 0.9rem;
}
.product-detail ul li{
    margin: 0;
    list-style: none;
    background: url(shoes_images/checked.png) left center no-repeat;
    background-size: 18px;
    padding-left: 1.7rem;
    margin: 0.4rem 0;
    font-weight: 600;
    opacity: 0.9;
}
.product-detail ul li span{
    font-weight: 400;
}
.purchase-info{
    margin: 1.5rem 0;
}
.purchase-info input,
.purchase-info .btn{
    border: 1.5px solid #ddd;
    border-radius: 25px;
    text-align: center;
    padding: 0.45rem 0.8rem;
    outline: 0;
    margin-right: 0.2rem;
    margin-bottom: 1rem;
}
.purchase-info input{
    width: 60px;
}
.purchase-info .btn{
    cursor: pointer;
    color: #fff;
}
.purchase-info .btn:first-of-type{
    background: #256eff;
}
.purchase-info .btn:last-of-type{
    background: #f64749;
}
.purchase-info .btn:hover{
    opacity: 0.9;
}



@media screen and (min-width: 992px){
    .card{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1.5rem;
    }
    .card-wrapper{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .product-imgs{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .product-content{
        padding-top: 0;
    }
}

</style>