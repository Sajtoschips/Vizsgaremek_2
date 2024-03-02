<template>
<div class="product">
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
</div>
</template>


<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useShoppingStore  } from "../../stores/shoppingStore";

const store = useShoppingStore()
const rout = useRoute();

const SelectedProduct = computed(() => {
  return store.products.find(
    (product) => product.ProductName === rout.params.ProductName
  );
});
</script>