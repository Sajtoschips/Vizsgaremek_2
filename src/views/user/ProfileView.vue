<template>
  <div class="container" style="padding-top: 5rem; padding-bottom: 8rem">
    <h1>{{ user.name }}</h1>
    <h1>{{ user.phone_number }}</h1>
    <h1>{{ user.adress }}</h1>
    <h1>{{ user.email }}</h1>

    <div v-if="orders.length > 0">
      <h2>Rendeléseim:</h2>
      <ul>
        <div v-for="order in orders">
          <h3>Rendelés száma: {{ order.OrderNumber }}</h3>
          <h3>Ár: {{ order.Total }}</h3>
          <h3>Dátum: {{ order.OrderDate }}</h3>
          <h3>Szállítás: {{ order.ShipDate }}</h3>
          <ul>
            <li v-for="product in order.products" :key="itemIndex">
              Termék száma: {{ product.ProductNumber }}
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <div v-else>
      <p>Nincsenek rendeléseid.</p>
    </div>
  </div>
</template>

<script setup>
import { useShoppingStore } from "../../stores/shoppingStore.js";


const user = JSON.parse(sessionStorage.getItem("user"));
const { orders, fetchOrders } = useShoppingStore();

fetchOrders()
// renderelés késleltetése



// import { useShoppingStore } from "../../stores/shoppingStore.js";
// import { ref, onMounted } from 'vue';
// const user = JSON.parse(sessionStorage.getItem("user"));
// const orders = ref(null);

// onMounted(() => {
//   loadOrders();
// });

// function loadOrders() {
//   const saved = localStorage.getItem("orders");
//   if (saved) {
//     orders.value = JSON.parse(saved);
//   }
// }
</script>
