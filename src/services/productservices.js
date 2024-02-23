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
          return resp.data;
        })
        .catch((err) => {
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
