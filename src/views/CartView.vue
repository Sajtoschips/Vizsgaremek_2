<template>
  <body>
    <div class="cart-content" style="width: 100%">
      <div class="wrapper" v-if="data.cartItems.length === 0">
        <h1>A kosár tartalma üres!</h1>
        <p class="text-center">
          Kattints a <router-link to="/termekek">termékek</router-link> fülre és
          válogass kedvedre!
        </p>
      </div>
      <div class="wrapper" v-else>
        <h1>Kosár tartalma</h1>
        <div class="project">
          <div class="shop">
            <div
              class="box"
              v-for="item in data.cartItems"
              :key="item.ProductNumber"
            >
              <img
                :src="item.Image"
                class="fluid rounded"
                width="60"
                height="60"
              />
              <div class="content">
                <h3>{{ item.ProductName }}</h3>
                <h4>{{ item.RetailPrice }} Ft</h4>
                <p @click="data.removeFromCart(item)" class="btn-area">
                  <i aria-hidden="true" class="fa fa-trash"></i>
                  <span class="btn2">Törlés</span>
                </p>
                <i @click="data.incrementQ(item)" class="bi bi-plus-circle"></i>
                      <span class="mx-2">
                        {{ item.quantity }}
                      </span>
                      <i @click="data.decrementQ(item)" class="bi bi-dash-circle"></i>
              </div>
            </div>
          </div>
          <div class="right-bar">
            <p>
              <span>Termék(ek) ára: </span> <span>{{ teljesAr }} Ft</span>
            </p>
            <hr />
            <p>
              <span v-if="szallitas == 0"> Ingyenes szállítás </span>
              <span v-else>  Szállítás költsége:</span> <span>{{ szallitas }} Ft</span>
            </p>
            <hr/>
            <p>
              <span>Összesen</span> <span>{{ teljesArSzallitassal }} Ft</span>
            </p>
            <a href="#"><i class="fa fa-shopping-cart"></i>Folytatás</a>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script setup>
import { useShoppingStore } from "../stores/shoppingStore";
import { computed } from "vue";
// get store
const data = useShoppingStore();
const alapSzallitas = 1500;
const ingyenesSzallitasHatar = 100000;

const teljesAr = computed(() => {
  return data.cartItems.reduce(
    (osszeg, t) => osszeg + t.RetailPrice * t.quantity,
    0
  );
});

const szallitas = computed(() => {
  return teljesAr.value >= ingyenesSzallitasHatar ? 0 : alapSzallitas;
});

const teljesArSzallitassal = computed(() => {
  return teljesAr.value + szallitas.value;
});
</script>
<style scoped>
i {
  cursor: pointer;
}
.cart-content {
  margin-top: 100px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
.wrapper h1 {
  padding: 20px 0;
  text-align: center;
  text-transform: uppercase;
}
.project {
  display: flex;
}
.shop {
  flex: 75%;
}
.box {
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 20px;
  background: #fff;
  transition: all 0.6s ease;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.box:hover {
  border: none;
  transform: scale(1.01);
}
.box img {
  width: 200px;
  height: 200px;
  margin: 5px;
}
.content {
  padding: 20px;
  width: 100%;
  position: relative;
}
.content h3 {
  margin-bottom: 30px;
}
.content h4 {
  margin-bottom: 50px;
}
.btn-area {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 25px;
  background-color: #3a71a9;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
.btn-area:hover {
  background-color: #76bfb6;
  color: #fff;
  font-weight: 600;
}
.unit input {
  width: 40px;
  padding: 5px;
  text-align: center;
}
.btn-area i {
  margin-right: 5px;
}
.right-bar {
  flex: 30%;
  margin-left: 20px;
  padding: 20px;
  height: 250px;
  border-radius: 5px;
  background: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.right-bar hr {
  margin-bottom: 25px;
}
.right-bar p {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 16px;
}
.right-bar a {
  background-color: #76bfb6;
  color: #fff;
  text-decoration: none;
  display: block;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-weight: 900;
}
.right-bar i {
  margin-right: 15px;
}
.right-bar a:hover {
  background-color: #3972a7;
}
@media screen and (max-width: 700px) {
  .content h3 {
    margin-bottom: 15px;
  }
  .content h4 {
    margin-bottom: 20px;
  }
  .btn2 {
    display: none;
  }
  .box {
    height: auto;
  }
  .box img {
    height: 120px;
    width: 120px;
  }
}
@media screen and (max-width: 900px) {
  .project {
    flex-direction: column;
  }
  .right-bar {
    margin-left: 0;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1250px) {
  .wrapper {
    max-width: 95%;
  }
}
</style>
