import Axios from "./dataservice.js";

export default {
  registerUser(data) {
    return Axios.post("/register", {
      name: data.name,
      email: data.email,
      password: data.password,
      adress: data.adress,
      phone_number: data.phone_number,
    })
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((err) => {
        // console.log(err.response);
        return Promise.reject(err.response);
      });
  },
  login(data) {
    return Axios.post("/login", data)
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },
  logout(token) {
    return Axios.post("/logout", "", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },
  sendEmail(email) {
    return Axios.post("/forgotPassword", { email: email })
      .then((resp) => {
        return resp;
      })
      .catch((err) => {
        return Promise.reject(err.response);
      });
  },
  changePassword(token, newPassword) {
    return Axios.post("/resetPassword", { token, newPassword })
      .then((resp) => resp.data)
      .catch((err) => Promise.reject(err.response));
  },
};
