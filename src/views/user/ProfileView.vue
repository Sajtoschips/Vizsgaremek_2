<template>
  <div class="container" style="padding-top: 5rem; padding-bottom: 8rem">
    <h1>{{ user.name }}</h1>
    <h1>{{ user.id }}</h1>
    <h1>{{ user.email }}</h1>
    <h1>{{ user.adress }}</h1>

    <div v-if="orders && orders.length > 0">
      <h2>Rendeléseim:</h2>
      <ul>
        <!-- <div v-for="(order, index) in orders" :key="index">
          <h3>Rendelés száma: {{ order.OrderNumber }}</h3>
          <ul>
            <li v-for="(item, itemIndex) in order.items" :key="itemIndex">
              Termék száma: {{ item.ProductNumber }}, Ára:
              {{ item.QuotedPrice }}, Mennyiség: {{ item.QuantityOrdered }}
            </li>
          </ul>
        </div> -->
      </ul>
    </div>
    <div v-else>
      <p>Nincsenek rendeléseid.</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../../stores/userstore.js";
import { storeToRefs } from "pinia";
import { useShoppingStore } from "../../stores/shoppingStore.js";

// storeToRefs segítségével megszerezzük a user és orders állapotokat a userstore-ból
const { user } = storeToRefs(useUserStore());
const { orders, fetchOrders } = useShoppingStore();

// Felhasználó rendeléseinek lekérése
fetchOrders();
</script>
