<template>
  <body>
    <div class="container" style="padding-top: 5rem; padding-bottom: 8rem">
    <div v-if="orders.length > 0">
      <h2>Rendeléseim:</h2>
      <div v-for="(order, index) in orders" :key="index" class="order-container">
        <div class="order-summary">
          <div>
            <h3>Rendelés száma: {{ order.OrderNumber }}</h3>
            <h3>Rendelés összege: {{ formatCurrency(order.Total) }} Ft</h3>
          </div>
          <button @click="toggleOrder(index)" class="details-btn">{{ order.open ? 'Részletek elrejtése' : 'Részletek megjelenítése' }}</button>
        </div>
        <div v-if="order.open" class="details-container">
          <h1>Rendelt termékek:</h1>
          <div v-for="(product, itemIndex) in order.products" :key="itemIndex" class="product-container">
            <img :src="product.Image" alt="Product Image" class="product-image">
            <div class="product-details">
              <h4>{{ product.ProductName }}</h4>
              <p>Termék száma: {{ product.ProductNumber }}</p>
              <p>Ár: {{ formatCurrency(product.RetailPrice) }} Ft</p>
            </div>
          </div>
          <h4>Rendelés dátuma: {{ order.OrderDate }}</h4>
          <h4>Várható szállítás: {{ order.ShipDate }}</h4>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Nincsenek rendeléseid.</p>
    </div>
  </div>
  </body>
  
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserStore } from "../../stores/userstore";
import productservices from "../../services/productservices";

const orders = ref([]);
const userStore = useUserStore();

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}



onBeforeMount(() => {
  if (userStore.user.token) {
    productservices
      .GetOrder(userStore.user.token)
      .then((resp) => {
        orders.value = resp;
        orders.value.forEach((order) => {
          order.open = false; // Hozzáadjuk az 'open' tulajdonságot minden rendeléshez
        });
      })
      .catch((err) => {
        console.error("Hiba az rendelések lekérése során:", err);
      });
  } else {
    console.error("Hiányzó felhasználói token");
  }
});
console.log(orders);

function toggleOrder(index) {
  orders.value[index].open = !orders.value[index].open;
}

</script>

<style scoped>

body{
  background: #6aa7ff;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}

.order-container {
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 15px;
}

.order-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.order-summary > div {
  flex: 1;
}

.details-btn {
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
}

.details-container {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.product-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
}

.product-details h4 {
  margin-bottom: 5px;
}

.product-details p {
  margin: 0;
}
</style>
