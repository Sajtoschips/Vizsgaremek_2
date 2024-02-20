<template>
  <!-- <div class="container">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="product in products" :key="product.ProductNumber">
        <div class="card">
          <img :src="product.Image" claspros="card-img-top" alt="..." />
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
  </div> -->

  <div class="card">
    <DataView :value="products" paginator :rows="10">
      <template #list="slotProps">
        <div class="grid grid-nogutter">
          <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
            <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3"
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="md:w-10rem relative">
                <img class="block xl:block mx-auto border-round w-full" :src="item.Image" :alt="item.ProductName" />
                <!-- <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute" style="left: 4px; top: 4px"></Tag> -->
              </div>
              <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                  <div>
                    <span class="font-medium text-secondary text-sm">{{ item.ProductName }}</span>
                    <div class="text-lg font-medium text-900 mt-2">{{ item.CategoryID }}</div>
                  </div>

                </div>
                <div class="flex flex-column md:align-items-end gap-5">
                  <span class="text-xl font-semibold text-900">{{ item.RetailPrice }} Ft</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button @click="addToCart(item)" icon="pi pi-shopping-cart" label="Buy Now"
                      class="flex-auto md:flex-initial white-space-nowrap"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from "vue";
// import productservices from "../../services/productservices";
import { useUserStore } from "../../stores/userstore";
import { storeToRefs } from "pinia";
import { useShoppingStore } from "@/stores/shoppingStore";
import productservices from "../../services/productservices";
import Button from 'primevue/button';

import "bootstrap";


import DataView from 'primevue/dataview';
// optional

// const { user } = storeToRefs(useUserStore());

const shoppingStore = useShoppingStore();

// onMounted(() => {
//   shoppingStore.fetchProducts();
// });

// const products = computed(() => shoppingStore.products);

const addToCart = (product) => {
  shoppingStore.addToCart(product);
};

onMounted(() => {
  productservices.getAllProduct().then((data) => (products.value = data));
});

const products = ref();

</script>

<style lang="scss" scoped>
img {
  width: 200px;
  height: 150px;
}
</style>
