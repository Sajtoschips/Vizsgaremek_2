<template>
    <div class="row">
      <div class="col-md-12-col-lg-12-col-sm-6">
        <div class="card" v-if="data.cartItems.length === 0">
          <div class="card-body text-center">
            <h1>A kosár tartalma üres!</h1>
            <p>Kattints a <router-link to="/">Kezdőlapra</router-link> és válogass a termékek között!</p>
          </div>
        </div>
        <div class="card" v-else>
          <div class="card-body">
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Termék</th>
                    <th>Mennyiség</th>
                    <th>Ár</th>
                    <th>Összesen</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data.cartItems" :key="item.ProductNumber">
                    <td>
                      <img :src="item.Image" class="fluid rounded" width="60" height="60" :alt="item.ProductName" />
                    </td>
                    <td>
                      {{ item.ProductName }}
                    </td>
                    <td>
                      <i @click="data.incrementQ(item)" class="bi bi-caret-up"></i>
                      <span class="mx-2">
                        {{ item.quantity }}
                      </span>
                      <i @click="data.decrementQ(item)" class="bi bi-caret-down"></i>
                    </td>
                    <td>{{ item.RetailPrice }} Ft</td>
                    <td>{{ item.RetailPrice * item.quantity }} Ft</td>
                    <td>
                      <i @click="data.removeFromCart(item)" class="bi bi-cart-x text-danger torles"></i>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="3" class="text-center">Fizetendő</th>
                    <td colSpan="3" class="text-center">
                      <span class="badge bg-danger rounded-pill">
                        {{
                          data.cartItems.reduce(
                            (acc, item) =>
                              (acc += item.RetailPrice * item.quantity),
                            0
                          )
                        }}
                        Ft
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useShoppingStore } from "../stores/shoppingStore";
// get store
const data = useShoppingStore();
</script>
<style scoped>
i {
  cursor: pointer;
}
</style>
