import { defineStore } from "pinia";
import Axios from "../services/dataservice";
import { useToast } from "vue-toastification";

const toast = useToast();

// ...

export const useShoppingStore = defineStore("cart", {
  state: () => {
    return {
      products: [],
      cartItems: [],
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

    addToCart(item) {
      let index = this.cartItems.findIndex(
        (product) => product.ProductNumber === item.ProductNumber
      );
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
        toast.success("A termék frissítve a kosárhoz!", {
          timeout: 1000
        });
      } else {
        item.quantity = 1;
        this.cartItems.push(item);
        toast.success("A termék hozzáadva a kosárhoz!", {
          timeout: 1000
        });
        
      }
    },
    incrementQ(item) {
      let index = this.cartItems.findIndex(
        (product) => product.ProductNumber === item.ProductNumber
      );
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      }
    },
    decrementQ(item) {
      let index = this.cartItems.findIndex(
        (product) => product.ProductNumber === item.ProductNumber
      );
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(
            (product) => product.ProductNumber !== item.ProductNumber
          );
        }
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(
        (product) => product.ProductNumber !== item.ProductNumber
      );
      toast.error("A termék törölve a kosárból!", {
        timeout: 3000
      });
    },
  },
});