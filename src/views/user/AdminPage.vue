<template>
    <div class="container-fluid" style="padding-bottom: 5rem; padding-top: 8rem;">
        <h1 class="text-center">Termékek kezelése a webshop-ban</h1>
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
                    <td>{{ product.RetailPrice }}</td>
                    <td>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-success mx-2">Módosítás</button>
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


const shoppingStore = useShoppingStore();

const products = ref([]);
const actualPage = ref(1);
const lastPage = ref(1)
const isPaged = ref(false)
const userStore = useUserStore();


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

function deleteProduct(id){
    productservices.deleteProductByAdmin(id, userStore.user.token).then((resp) => {
        console.log(resp);
    });
}



</script>

<style scoped>
li {
    cursor: pointer;
}
</style>