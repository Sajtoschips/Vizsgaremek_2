<template>

  <div class="container-fluid" style="padding-top: 5rem; padding-bottom: 8rem;">
    <div class="row">
      <!-- Side Navigation -->
      <div class="col-md-3" >
        <div class="list-group" id="list-tab" role="tablist">
          <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list"
            href="#list-home" role="tab" aria-controls="list-home">Processzor</a>
            
          <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list"
            href="#list-profile" role="tab" aria-controls="list-profile">Videókártya</a>
          <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list"
            href="#list-messages" role="tab" aria-controls="list-messages">Alaplap</a>
          <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list"
            href="#list-settings" role="tab" aria-controls="list-settings">Memória</a>
          <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list"
            href="#list-settings" role="tab" aria-controls="list-settings">Tápegység</a>
          <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list"
            href="#list-settings" role="tab" aria-controls="list-settings">Háttértároló</a>
          <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list"
            href="#list-settings" role="tab" aria-controls="list-settings">Gépház</a>
        </div>
      </div>

      <!-- Products -->
      <div class="row row-cols-1 row-cols-md-3 g-4 col-md-9">
        <div class="col" v-for="product in products" :key="product.ProductName">
          <div class="card h-100 border-0 shadow-sm">
            <img :src="product.Image" class="card-img-top" alt="Product Image"
              @click="goToProductPage(product.ProductName)" style="max-width: 100%; height: auto;" />
            <div class="card-body">
              <h5 class="card-title mb-3">{{ product.ProductName }}</h5>
              <p class="card-text mb-3 font-weight-bold">{{ product.RetailPrice }} Ft</p>
              <button class="btn btn-primary btn-sm" @click="addToCart(product)">
                Kosárba
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
  <!-- <DataView :value="products">
    <template #list="slotProps">
        <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                    <div class="md:w-10rem relative">
                        <img class="block xl:block mx-auto border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                        <Tag :value="item.inventoryStatus" :severity="getSeverity(item)" class="absolute" style="left: 4px; top: 4px"></Tag>
                    </div>
                    <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                        <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                            <div>
                                <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                            </div>
                            <div class="surface-100 p-1" style="border-radius: 30px">
                                <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                    <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                    <i class="pi pi-star-fill text-yellow-500"></i>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-column md:align-items-end gap-5">
                            <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                            <div class="flex flex-row-reverse md:flex-row gap-2">
                                <Button icon="pi pi-heart" outlined></Button>
                                <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</DataView> -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
// import productservices from "../../services/productservices";
import { useUserStore } from "../../stores/userstore";
import { storeToRefs } from "pinia";
import { useShoppingStore } from "@/stores/shoppingStore";
import productservices from "../../services/productservices";
import Button from "primevue/button";
import { useRouter, useRoute } from "vue-router";
import "bootstrap";

import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
// optional

// const { user } = storeToRefs(useUserStore());
const products = computed(() => shoppingStore.products);
const router = useRouter();
const shoppingStore = useShoppingStore();

onMounted(() => {
  shoppingStore.fetchProducts();
});

const goToProductPage = (ProductName) => {
  router.push({ name: "Termek", params: { ProductName } });
};

const addToCart = (product) => {
  shoppingStore.addToCart(product);
};

// onMounted(() => {
//   productservices.getAllProduct().then((data) => (products.value = data));
// });

// const products = ref();
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.list-group{
  margin: 10px;
  border: 1px black solid;
  
  /* margin-top: 10px;
  margin-bottom: 20px; */
}

</style>