import Axios from "./dataservice.js";

export default {
  getAllProduct() {
    return Axios.get("/products")
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },
  getProductsPaged(page) {
    return Axios.get("/productsPaged?page=" + page)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },
  getAllCategories() {
    return Axios.get("/categories")
      .then((resp) => {
        console.log(resp);
        return resp.data;
      })
      .catch((err) => {
        console.error("Hiba a termékek lekérése során:", err);
        return Promise.reject(err.response);
      });
  },
  getCategoryById(id) {
    return Axios.get(`/categories/${id}`)
      .then((categories) => {
        console.log(categories);
        return categories;
      })
      .catch((err) => {
        console.error("Hiba a kategória lekérése során:", err);
        return Promise.reject(err.response);
      });
  },
  getProductByCategoryId(id) {
    return Axios.get("/products/" + id)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },

  deleteProductByAdmin(id, token) {
    return Axios.delete("/deleteProcts/" + id, {
      headers: { Authorization: "Bearer " + token },
    })

      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },

  GetOrder(token) {
    return Axios.get("/OrdersByUser", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },

  getProductById(id) {
    return Axios.get("/product/" + id)
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },

  ModifyProductByAdmin(id, data, token) {
    return Axios.post("/updateProducts/" + id, data, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },

  MakeProductByAdmin(data, token) {
    return Axios.post("/makeProducts", data, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },
};
