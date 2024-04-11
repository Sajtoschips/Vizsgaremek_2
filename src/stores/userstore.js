import { defineStore } from "pinia";
import userservice from "../services/userservice";
export const useUserStore = defineStore("userstore", {
  state: () => ({
    user: {
      name: "",
      token: "",
      id: null,
      role: null
    },
    status: {
      loggedIn: false,
      message: "",
    },
    orders: [],
  }),
  getters: {},
  actions: {
    login(data) {
      return userservice
        .login(data)
        .then((resp) => {
          this.status.loggedIn = true;
          this.user = resp.data.user;
          this.user.token = resp.data.token;

          this.status.message = ""; //resp.data.message;
          sessionStorage.setItem("user", JSON.stringify(this.user));
        })
        .catch((err) => {
          this.status.loggedIn = false;
          this.user = { name: "", token: "" };
          this.status.message = err.data.error;
          return Promise.reject(err.resposne);
        });
    },
    logout() {
      return userservice.logout(this.user.token).then(() => {
        this.status.loggedIn = false;
        this.user = { name: "", token: "" };
        sessionStorage.removeItem("user");
      });
    },
    // fetchOrders() {
    //   return userservice.getOrders(this.user.token)
    //     .then((response) => {
    //       this.orders = response.data.orders; // Feltételezzük, hogy a válasz tartalmazza a rendeléseket
    //     })
    //     .catch((error) => {
    //       console.error('Hiba történt a rendelések lekérése során:', error);
    //     });
    //   },
  },
});
