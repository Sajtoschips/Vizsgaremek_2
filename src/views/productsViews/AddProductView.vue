<template>
  <div class="container p-5">
    <div class="mt-5 row justify-content-around">
      <div class="col-10 col-md-6">
        <div class="mb-3">
          <label for="category" class="form-label">Kategória</label>
          <select v-model="selectedCategory" class="form-select" id="category">
            <option v-for="category in categories" :key="category.CategoryID" :value="category.CategoryID">
              {{ category.CategoryName }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="productName" class="form-label">Termék neve</label>
          <input type="text" class="form-control" id="productName" v-model="productName" />
        </div>
        <div class="mb-3">
          <label for="productDescription" class="form-label">Termék leírása</label>
          <input type="text" class="form-control" id="productDescription" v-model="productDescription" />
        </div>
        <div class="mb-3">
          <label for="productImage" class="form-label">Termék képe (URL)</label>
          <input type="text" class="form-control" id="productImage" v-model="productImage" />
        </div>
        <div class="mb-3">
          <label for="RetailPrice" class="form-label">Termék ára</label>
          <input type="text" class="form-control" id="RetailPrice" v-model="RetailPrice" />
        </div>
        <div class="mb-3">
          <label for="productQuantity" class="form-label">Raktáron</label>
          <input type="text" class="form-control" id="productQuantity" v-model="productQuantity" />
        </div>
        <button class="btn btn-success" @click="saveProductData">
          Termék felvétele
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import productservice from "../../services/productservices";
import { useUserStore } from "../../stores/userstore";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();
const userStore = useUserStore();
const selectedCategory = ref(null);
const categories = ref([]);

onMounted(() => {
  fetchCategories();
});

async function fetchCategories() {
  try {
    const response = await productservice.getAllCategories();
    categories.value = response;
  } catch (error) {
    console.error("Hiba történt a kategória lekérése közben:", error);
  }
}

async function saveProductData() {
  const confirmed = confirm("Biztosan fel kívánja venni ezt a terméket?");

  if (confirmed) {
    const productData = {
      CategoryID: selectedCategory.value,
      ProductName: productName.value,
      ProductDescription: productDescription.value,
      Image: productImage.value,
      QuantityOnHand: productQuantity.value,
      RetailPrice: RetailPrice.value,
    };

    try {
      console.log(productData);
      const response = await productservice.MakeProductByAdmin(productData, userStore.user.token);
      console.log("Termék sikeresen felvéve:", response);
      toast.success("Termék sikeresen felvéve!");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error) {
      console.error("Hiba történt a termék felvétele során:", error);
      alert("Hiba történt a termék felvétele során. Kérjük, próbálja újra!");
    }
  } else {
    console.log("A felvétel megerősítése visszautasítva.");
  }
}
</script>
