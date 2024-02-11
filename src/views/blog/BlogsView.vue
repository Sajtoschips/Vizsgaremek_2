<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="product in products" :key="product.ProductNumber">
        <div class="card">
          <img :src="product.Image" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ product.ProductName }}</h5>
            <p class="card-text">{{ product.RetailPrice }} Ft</p>
            <button class="btn btn-primary" @click="addToCart(product)">
              Kosárba
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from "vue";
// import productservices from "../../services/productservices";
import { useUserStore } from "../../stores/userstore";
import { storeToRefs } from "pinia";
import { useShoppingStore } from "@/stores/shoppingStore";
import "bootstrap";
const { user } = storeToRefs(useUserStore());

const shoppingStore = useShoppingStore();

onMounted(() => {
  shoppingStore.fetchProducts();
});

const products = computed(() => shoppingStore.products);

const addToCart = (product) => {
  shoppingStore.addToCart(product);
};
</script>

<style lang="scss" scoped>
img {
  width: 200px;
  height: 150px;
}
</style>
