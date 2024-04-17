import { defineStore } from "pinia";
import Axios from "../services/dataservice";
import router from "../router";
import { useToast } from "vue-toastification";

const toast = useToast();

// ...

export const useShoppingStore = defineStore("cart", {
  state: () => {
    return {
      products: [],
      cartItems: loadFromStorage("cartItems") || [],
      orders: [],
    };
  },
  getters: {
    countCartItems() {
      return this.cartItems.length;
    },
    getCartItems() {
      return this.cartItems;
    },
  },
  actions: {
    fetchProducts() {
      Axios.get("/products")
        .then((resp) => {
          this.products = resp.data;
        })
        .catch((err) => {
          console.error("Hiba a termékek lekérése során:", err);
        });
    },

    fetchCategories() {
      Axios.get("/categories")
        .then((resp) => {
          this.products = resp.data;
        })
        .catch((err) => {
          console.error("Hiba a termékek lekérése során:", err);
        });
    },

    async placeOrder(orderData) {
      try {
        // A felhasználó adatainak kiolvasása a sessionStorage-ből
        const user = JSON.parse(sessionStorage.getItem("user"));

        // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
        if (!user || !user.token) {
          // Ha nincs bejelentkezve, irányítsuk át a felhasználót a bejelentkezési oldalra
          router.push("/bejelentkezes"); // Ezt a funkciót neked kell implementálnod
          return; // Kilépünk a függvényből
        }

        const userToken = user.token;
        console.log(userToken);

        // Elküldjük az autentikációs tokent az Authorization header-ben
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };

        await console.log(orderData);
        // Itt adhatsz hozzá további megrendelési adatokat

        // Elküldjük az adatokat a szerverre az Authorization headerrel
        const response = await Axios.post("/orders", orderData, config);
        console.log("Megrendelés elküldve:", response.data);

        // Rendelésszám vagy más azonosító kinyerése a válaszból
        const orderId = response.data.OrderNumber; // Az orderId a válasz objektumban található azonosító lehet

        // Sikeres megrendelés esetén töröljük a kosár tartalmát a local storage-ból
        this.cartItems = [];
        saveToStorage("cartItems", this.cartItems);

        // Sikeres megrendelés esetén üzenetet jelenítünk meg a felhasználónak
        toast.success(
          `A megrendelés (${orderId}) számú azonosítóval sikeresen elküldve!`
        );
      } catch (error) {
        console.error("Hiba történt a megrendelés során:", error);
        // Hiba esetén üzenetet jelenítünk meg a felhasználónak
        toast.error(
          "Hiba történt a megrendelés során. Kérjük, próbáld újra később!"
        );
      }
    },

    addToCart(item) {
      let index = this.cartItems.findIndex(
        (product) => product.ProductNumber === item.ProductNumber
      );
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        toast.success("A termék frissítve a kosárban!", {
          timeout: 1000,
        });
      } else {
        item.quantity = 1;
        this.cartItems.push(item);
        toast.success("A termék hozzáadva a kosárhoz!", {
          timeout: 1000,
        });
      }
      saveToStorage("cartItems", this.cartItems);
    },
    incrementQ(item) {
      let index = this.cartItems.findIndex(
        (product) => product.ProductNumber === item.ProductNumber
      );
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      }
      saveToStorage("cartItems", this.cartItems);
    },
    decrementQ(item) {
      let index = this.cartItems.findIndex(
        (product) => product.ProductNumber === item.ProductNumber
      );
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.removeFromCart(item);
        }
        saveToStorage("cartItems", this.cartItems);
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(
        (product) => product.ProductNumber !== item.ProductNumber
      );
      toast.error("A termék törölve a kosárból!", {
        timeout: 3000,
      });
      saveToStorage("cartItems", this.cartItems);
    },
    fetchOrders() {
      try {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userToken = user.token;
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        };

        Axios.get("/OrdersByUser", config)
          .then((resp) => {
            console.log("API válasz:", resp.data);
            localStorage.setItem("orders", JSON.stringify(resp.data));
            const ordersArray = Array.from(resp.data);
            console.log("Rendelések tömb:", ordersArray);
            // Az új struktúrájú tömbet mentjük az orders változóba
            this.orders = ordersArray;
            console.log("Rendelések:", this.orders);
          })
          .catch((error) => {
            console.error("Hiba történt a rendelések lekérése során:", error);
          });
      } catch (error) {
        console.error("Hiba történt a rendelések lekérése során:", error);
      }
    },
    // loadOrders() {
    //   // betöltjük a localStorage-ból
    //   const savedOrders = localStorage.getItem("orders");
    //   if (savedOrders) {
    //     this.orders = JSON.parse(savedOrders);
    //   } else {
    //     this.fetchOrders();
    //   }
    // },
  },
});
function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
