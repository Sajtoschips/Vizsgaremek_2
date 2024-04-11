<template>
  <div class="container-fluid" style="padding-top: 5rem; padding-bottom: 8rem">
    <div class="row">
      <!-- Side Navigation -->
      <div class="col-md-3 col-lg-3 col-sm-12">
        <div class="list-group" id="list-tab" role="tablist">
          <a class="list-group-item" :class="{ active: selectedCategory === null }" @click="selectedCategory = null">
            Összes termék
          </a>

          <a v-for="cat in categories" :key="cat.CategoryID" class="list-group-item"
            :class="{ active: selectedCategory === cat }" @click="selectedCategory = cat">
            {{ cat.CategoryName }}
          </a>
        </div>
      </div>

      <!-- Products -->
      <div class="row row-cols-12 row-cols-md-12 ">
        <div v-if="selectedCategory">
          <div class="col" v-for="product in filteredProducts" :key="product.ProductID">
            <div class="card h-100 border-3 shadow-sm mt-2">
              <img :src="product.Image" class="card-img-top" alt="Product Image"
                @click="goToProductPage(product.ProductName)" />
              <div class="card-body">
                <h5 class="card-title mb-3">{{ product.ProductName }}</h5>
                <p class="card-text mb-3 font-weight-bold">{{ product.RetailPrice }} Ft</p>
                <button class="btn btn-primary btn-sm" @click="addToCart(product)">Kosárba</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="col" v-for="product in products" :key="product.ProductID">
            <div class="card h-100 border-3 shadow-sm mt-2">
              <img :src="product.Image" class="card-img-top" alt="Product Image"
                @click="goToProductPage(product.ProductName)" />
              <div class="card-body">
                <h5 class="card-title mb-3">{{ product.ProductName }}</h5>
                <p class="card-text mb-3 font-weight-bold">{{ product.RetailPrice }} Ft</p>
                <button class="btn btn-primary btn-sm" @click="addToCart(product)">Kosárba</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useShoppingStore } from "@/stores/shoppingStore";
import productservices from "../../services/productservices";
import { useRouter } from "vue-router";

const router = useRouter();
const shoppingStore = useShoppingStore();
const selectedCategory = ref(null);

onMounted(() => {
  shoppingStore.fetchProducts();
});

const { categories, products } = useProductData();
const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value;
  }
  return products.value.filter((p) => p.CategoryID === selectedCategory.value.CategoryID);
});

function useProductData() {
  const categories = ref([]);
  const products = ref([]);

  productservices.getAllCategories().then((cats) => {
    categories.value = cats;
  });

  productservices.getAllProduct().then((prods) => {
    products.value = prods;
  });

  return { categories, products };
}

const goToProductPage = (ProductName) => {
  router.push({ name: "Termek", params: { ProductName } });
};

const addToCart = (product) => {
  shoppingStore.addToCart(product);
};
</script>

<style scoped>
img {
  /* width: 100%;
  height: auto; */
  width: 50%;
  height: auto;
  cursor: pointer;
}

.card {
  width: 100%; /* Kártya teljes szélessége */
  height: 100%; /* Kártya teljes magassága */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-img-top {
  width: 100%; /* Kép teljes szélessége a kártyán belül */
  height: 50%; /* Kép magassága a kártya felének a magassága */
  object-fit: cover; /* A kép méretének megfelelően igazítva */
}

.card-body {
  padding: 1.25rem; /* Kártya tartalom belső margója */
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.list-group {
  margin: 10px;
  border: 1px black solid;

  /* margin-top: 10px;
  margin-bottom: 20px; */
}

a:hover {
  cursor: pointer;
}

.col {
  display: inline-block;
  width: 30%;
  /* Válaszd az igényeidnek megfelelő szélességet */
  margin-right: 10px;
  /* Opcionális: szükség esetén adj margót a kártyák közé */
  margin-bottom: 20px;
  /* Opcionális: adj margót alulra a kártyák között */
}
</style>
