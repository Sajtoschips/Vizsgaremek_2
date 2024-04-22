<template>
  <div class="container p-5">
    <div class="mt-5 row justify-content-around">
      <div class="col-10 col-md-6">
        <div class="mb-3">
          <label for="number" class="form-label">Termék azonosító</label>
          <input type="number" class="form-control" id="name" v-model="product.ProductNumber" disabled />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Termék neve</label>
          <input type="text" class="form-control" id="name" v-model="product.ProductName" />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Termék leírása</label>
          <input type="text" class="form-control" id="name" v-model="product.ProductDescription" />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Termék képe</label>
          <input type="text" class="form-control" id="name" v-model="product.Image" />
        </div>
        <div class="mb-3">
          <label for="number" class="form-label">Termék ára</label>
          <input type="text" class="form-control" id="name" v-model="product.RetailPrice" />
        </div>
        <button class="btn btn-success" @click="saveProductData">Mentés</button>
        <router-link to="/admin" class="btn btn-primary ms-2">Mégse</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import productservice from "../../services/productservices";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/userstore";
import { useToast } from "vue-toastification";

const toast = useToast();

const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const productId = ref(null);
const product = ref([]);

onMounted(() => {
  productId.value = route.params.productId;
  fetchProduct();
});

async function fetchProduct() {
  try {
    const response = await productservice.getProductById(productId.value);
    product.value = response;
    console.log(product.value);
  } catch (error) {
    console.error("Hiba történt a termék lekérése közben:", error);
  }
}

async function saveProductData() {
  const confirmed = confirm("Biztosan fel kívánja venni ezt a terméket?");
  if (confirmed) {
    try {
      await productservice.ModifyProductByAdmin(
        productId.value,
        product.value,
        userStore.user.token
      );
      toast.success("Sikeresen módosította a terméket!");
      router.push("/admin")
      // Itt irányítsd át a felhasználót az új termék nézethez vagy az előző oldalra
      // Példa: router.push('/products');
    } catch (error) {
      console.error("Hiba történt a termék módosítása közben:", error);
      alert(
        "Hiba történt a termék módosítása közben. Kérjük, próbálja újra később!"
      );
    }
  }
}
</script>

<style scoped>
/* Itt adhatod meg a saját stílusodat a komponenshez */
</style>
