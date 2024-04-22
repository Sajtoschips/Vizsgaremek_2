<template>
    <div class="container" style="padding-bottom: 5rem; padding-top: 8rem;">
        <h1 class="text-center">Termékek kezelése a webshop-ban</h1>
        <div class="d-flex justify-content-end mb-3 mx-5">
            <router-link to="/add-product" class="btn btn-primary">Termék hozzáadása</router-link>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-5">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" @click="getPorducts(actualPage--)"
                            v-if="actualPage > 1">Previous</a></li>
                    <li class="page-item"><a class="page-link" href="#">{{ actualPage }}</a></li>
                    <li class="page-item"><a class="page-link" @click="getPorducts(actualPage++)"
                            v-if="actualPage < lastPage">Next</a></li>
                </ul>
            </nav>
        </div>

        <table class="table">
            <thead>
                <tr class="text-center">
                    <th scope="col">Termék azonosító</th>
                    <th scope="col">Termék neve</th>
                    <th scope="col">Termék ára</th>
                    <th scope="col">Módosítás/Törlés</th>
                </tr>
            </thead>
            <tbody v-for="product in products" :key="product.ProductID">
                <tr class="text-center align-middle">
                    <th class="text-center" scope="row">{{ product.ProductNumber }}</th>
                    <td>{{ product.ProductName }}</td>
                    <td>{{ formatCurrency(product.RetailPrice) }} Ft</td>
                    <td>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-success mx-2" @click="modifyProduct(product)">Módosítás</button>
                            <button class="btn btn-danger" @click="deleteProduct(product.ProductNumber)">Törlés</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup>
import {
    ref,
    onMounted,
    computed
} from "vue";
import {
    useShoppingStore
} from "@/stores/shoppingStore";
import productservices from "../../services/productservices";
import {
    useRouter
} from "vue-router";
import { useUserStore } from "../../stores/userstore";

import { useToast } from "vue-toastification";

const toast = useToast();

const shoppingStore = useShoppingStore();

const products = ref([]);
const actualPage = ref(1);
const lastPage = ref(1)
const isPaged = ref(false)
const userStore = useUserStore();
const router = useRouter();

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function modifyProduct(product) {
    router.push({
        name: "ModifyProduct",
        params: { productId: product.ProductNumber }
    });
}

onMounted(() => {
    shoppingStore.fetchProducts();
    useProductData();
});

productservices.getCategoryById()
function useProductData() {

    productservices.getAllCategories().then((cats) => {
    });

    getPorducts(actualPage.value)

}

function getPorducts(page) {
    isPaged.value = true
    console.log(actualPage.value);
    productservices.getProductsPaged(actualPage.value).then((resp) => {
        products.value = resp.data;
        lastPage.value = Math.ceil(resp.total / 10);

    });
}

function deleteProduct(id) {
    const confirmDelete = confirm("Biztosan törölni szeretnéd ezt a terméket?");
    if (confirmDelete) {
        productservices.deleteProductByAdmin(id, userStore.user.token).then((resp) => {
            toast.error("Termék törölve!");
            console.log(resp);
            location.reload()
        });
    }
}


</script>

<style scoped>
li {
    cursor: pointer;
}
</style>