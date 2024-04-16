<template>
    <div class="container-fluid" style="padding-top: 5rem; padding-bottom: 8rem">
        <div>
            <div class="d-flex justify-content-center">
                <div class="list-group w-50" id="list-tab" role="tablist">
                    <a class="list-group-item text-center" :class="{ active: selectedCategory === null }"
                        @click="selectedCategory = null">
                        Összes termék
                    </a>

                    <a v-for="cat in categories" :key="cat.CategoryID" class="list-group-item text-center"
                        :class="{ active: selectedCategory === cat }" @click="selectedCategory = cat">
                        {{ cat . CategoryName }}
                    </a>
                </div>
            </div>
        </div>
        <!-- <div class=""> -->
        <!-- Side Navigation -->

        <!-- Products -->

        <div v-if="selectedCategory" class="row justify-content-center">
          <div class="col-3 card m-1 mb-5 card-deck" v-for="product in filteredProducts" :key="product.ProductID">
                <div class="imgBox">
                    <img  @click="goToProductPage(product.ProductName)" :src="product.Image" class="mouse">
                </div>
                <div class="contentBox">
                    <h3>{{ product .ProductName }}</h3>
                    <h2 class="price">{{ product .RetailPrice }} Ft</h2>
                    <a href="#" @click="addToCart(product)" class="buy">Vásárlás</a>
                </div>
            </div>
        </div>
        <div v-else class="row justify-content-center">
            <div class="col-3 card m-1 mb-5 card-deck" v-for="product in products" :key="product.ProductID">
                <div class="imgBox">
                    <img @click="goToProductPage(product.ProductName)" :src="product.Image" class="mouse">
                </div>
                <div class="contentBox">
                    <h3>{{ product .ProductName }}</h3>
                    <h2 class="price">{{ product . RetailPrice }} Ft</h2>
                    <a href="#" @click="addToCart(product)" class="buy">Vásárlás</a>
                </div>
            </div>
        </div>
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

    const router = useRouter();
    const shoppingStore = useShoppingStore();
    const selectedCategory = ref(null);

    onMounted(() => {
        shoppingStore.fetchProducts();
    });

    const {
        categories,
        products
    } = useProductData();
    const filteredProducts = computed(() => {
        if (!selectedCategory.value) {
            return products.value;
        }
        return products.value.filter((p) => p.CategoryID === selectedCategory.value.CategoryID);
    });

    function useProductData() {
        const categories = ref([]);
        const products = ref([]);

        productservices.getAllCategories().then((cats) => {
            categories.value = cats;
        });

        productservices.getAllProduct().then((prods) => {
            products.value = prods;
        });

        return {
            categories,
            products
        };
    }

    const goToProductPage = (ProductName) => {
        router.push({
            name: "Termek",
            params: {
                ProductName
            }
        });
    };

    const addToCart = (product) => {
        shoppingStore.addToCart(product);
    };
</script>

<style scoped>
    /* img {
  width: 100%;
  height: auto;
  width: 50%;
  height: auto;
  cursor: pointer;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-img-top {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.card-body {
  padding: 1.25rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.list-group {
  margin: 10px;
  border: 1px black solid;

}

a:hover {
  cursor: pointer;
} */

    * {
        margin: 0;
        padding: 0;
        font-family: "Istok Web", sans-serif;
    }

    body {
        min-height: 100vh;
        background: #212121;
    }

    .card {
        position: relative;
        width: 320px;
        height: 480px;
        background: black;
        border-radius: 20px;
        overflow: hidden;
    }

    .card::before {
        content: "";
        position: absolute;
        top: -50%;
        width: 100%;
        height: 100%;
        background: #4070f4;
        transform: skewY(345deg);
        transition: 0.5s;
    }

    .card:hover::before {
        top: -70%;
        transform: skewY(390deg);
    }

    .card::after {
        position: absolute;
        bottom: 0;
        left: 0;
        font-weight: 600;
        font-size: 6em;
        color: rgba(0, 0, 0, 0.1);
    }

    .card .imgBox {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /* padding-top: 20px; */
        z-index: 1;
    }

    /*
.card .imgBox img {
    max-width: 100%;

    transition: .5s;
}

.card:hover .imgBox img {
    max-width: 50%;

}
*/
    .card .contentBox {
        position: relative;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 2;
    }

    .card .contentBox h3 {
        font-size: 18px;
        color: white;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .card .contentBox .price {
        font-size: 24px;
        color: white;
        font-weight: 700;
        letter-spacing: 1px;
    }

    .card .contentBox .buy {
        position: relative;
        top: 100px;
        opacity: 0;
        padding: 10px 30px;
        margin-top: 15px;
        color: #000000;
        text-decoration: none;
        background: white;
        border-radius: 30px;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: 0.5s;
    }

    .card:hover .contentBox .buy {
        top: 0;
        opacity: 1;
    }

    .mouse {
        height: 300px;
        width: auto;
    }

    .price {
        text-align: center;
        margin-top: 1px;
    }

    h3 {
        text-align: center;
        margin-bottom: 5px;
    }

    h2 {
        text-align: center;

    }

    
</style>
