<script setup>
import {
  ref,
  onMounted,
  computed
} from "vue";
import {
  useShoppingStore
} from "@/stores/shoppingStore";
import productservices from "../services/productservices";
import {
  useRouter
} from "vue-router";


const router = useRouter();
const shoppingStore = useShoppingStore();
const selectedCategory = ref(null);
const categories = ref([]);
const products = ref([]);
const actualPage = ref(1);
const lastPage = ref(1)
const isPaged = ref(false)



onMounted(() => {
  shoppingStore.fetchProducts();
  useProductData();
});






productservices.getCategoryById()
function useProductData() {

  productservices.getAllCategories().then((cats) => {
    categories.value = cats;
  });

  getPorducts(actualPage.value)

}

function getPorducts(page) {
  isPaged.value = true
  console.log(actualPage.value);
  productservices.getProductsPaged(actualPage.value).then((resp) => {
    products.value = resp.data;
    lastPage.value = Math.ceil(resp.total / 10);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  });
}
function selectCategory(id) {
  productservices.getProductByCategoryId(id).then((resp) => {
    isPaged.value = false
    actualPage.value = 1;
    products.value = resp;
  })
}

const goToProductPage = (ProductName) => {
  router.push({
    name: "Termek",
    params: {
      ProductName
    }
  });
};

const addToCart = (product) => {
  shoppingStore.addToCart(product);
};
</script>

<template>

  <body>


    <div class="container" style="padding-top: 5rem; padding-bottom: 8rem;">
      <!-- Bevezető szöveg -->
      <div class="row mb-4">
        <div class="col-lg-8 offset-lg-2 text-center">
          <h1 class="display-3" style="color: #fff; font-weight: bold; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
            Üdvözöllek a <span style="color: #007bff;">GameStrix</span> Hardver Webáruházában!</h1>
          <p class="lead" style="color: #f8f9fa;">Fedezd fel a legjobb ajánlatainkat!</p>
        </div>
      </div>


      <div class="row mb-4">
        <div class="col">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../assets/img/1carou.png" class="d-block w-100" alt="Slide 1">
              </div>
              <div class="carousel-item">
                <img src="../assets/img/2carou.png" class="d-block w-100" alt="Slide 2">
              </div>
              <div class="carousel-item">
                <img src="../assets/img/3carou.png" class="d-block w-100" alt="Slide 3">
              </div>
              <div class="carousel-item">
                <img src="../assets/img/4carou.png" class="d-block w-100" alt="Slide 4">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>


      <!-- Akciós termékek -->



      <div class="row mb-4">
        <div class="col">
          <h2 class="mb-3">Akciós termékek</h2>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="product in products" :key="product.ProductID">
              <div class="col">
                <div class="card h-100">
                  <img @click="goToProductPage(product.ProductName)" :src="product.Image" class="mouse">
                  <div class="card-body">
                    <h5 class="card-title">{{ product.ProductName }}</h5>
                    <div class="card-text">
                      <p>
                        Régi ár: <s>{{ product.RetailPrice * 1.2 }} Ft</s>
                      </p>
                      <p> Új ár: {{ product.RetailPrice }} Ft</p>
                      <a  @click="addToCart(product)" class="buy btn btn-primary">Kosárba</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>




  </body>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap");

body {
  min-height: 100vh;
  background: #6aa7ff;
}

.carousel-item img {
  object-fit: contain;
  /* Képek arányának megőrzése a carousel-ban */
  max-height: 100%;
  /* Képek maximális magassága a carousel-ban */
}

.card {
  background-color: #1f1f1f;
  /* Kártyák háttere */
  color: #fff;
  /* Betűszín */
  border: none;
  /* Keret nélkül */
}

.card-title,
.card-text {
  color: #fff;
  /* Betűszín a kártyákban */
}

.card-body {
  padding: 20px;
  /* Belső tér a kártya tartalmának */
}

.card-body a {
  color: #fff;
  /* Link színe a kártyákban */
}

.card-body a:hover {
  text-decoration: none;
  /* Link aláhúzás eltüntetése */
}

.card-body input {
  color: #495057;
  /* Input mező szövegszíne */
}

.card-body input::placeholder {
  color: #6c757d;
  /* Placeholder szöveg színe */
}

.card-body .btn-primary {
  background-color: #007bff;
  /* Feliratkozás gomb háttérszíne */
  border-color: #007bff;
  /* Gomb keretszíne */
}

.card-body .btn-primary:hover {
  background-color: #0056b3;
  /* Gomb hover háttérszíne */
  border-color: #0056b3;
  /* Gomb hover keretszíne */
}

.carousel-inner img {
  object-fit: contain;
  /* Képek arányának megőrzése a carousel-ban */
  max-height: 100%;
  /* Képek maximális magassága a carousel-ban */
}

*{
  margin: 0;
  padding: 0;
  font-family: "Istok Web", sans-serif;
}

body {
  min-height: 100vh;
  background: #6aa7ff;
}

a {
  cursor: pointer;
}

.card {
  position: relative;
  width: 320px;
  height: 480px;
  background: black;
  border-radius: 20px;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: -50%;
  width: 100%;
  height: 100%;
 
  transform: skewY(345deg);
  transition: 0.5s;
}

.card:hover::before {
  top: -70%;
  transform: skewY(390deg);
}

.card::after {
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 600;
  font-size: 6em;
  color: rgba(0, 0, 0, 0.1);
}

.card .imgBox {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top: 20px; */
  z-index: 1;
}

/*
.card .imgBox img {
    max-width: 100%;

    transition: .5s;
}

.card:hover .imgBox img {
    max-width: 50%;

}
*/
.card .contentBox {
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
}

.card .contentBox h3 {
  font-size: 18px;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card .contentBox .price {
  font-size: 24px;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
}

.card .contentBox .buy {
  position: relative;
  top: 100px;
  opacity: 0;
  padding: 10px 30px;
  margin-top: 15px;
  color: #000000;
  text-decoration: none;
  background: white;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.5s;
}

.card:hover .contentBox .buy {
  top: 0;
  opacity: 1;
}

.mouse {
  height: 300px;
  width: auto;
}

.price {
  text-align: center;
  margin-top: 1px;
}

h3 {
  text-align: center;
  margin-bottom: 5px;
}

h2 {
  text-align: center;

}
</style>