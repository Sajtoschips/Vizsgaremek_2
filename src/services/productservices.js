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

  // insertBlog(data,token){
  //     return Axios.post('/blog',data,{headers: {"Authorization": "Bearer " + token}})
  //         .then(resp =>{
  //             return resp.data;
  //         })
  //         .catch(err =>{
  //             return Promise.reject(err.response);
  //         })
  // }
};
