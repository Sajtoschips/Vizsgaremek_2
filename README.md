<template>
  <body colore-scheme="isDark ? 'dark' : 'light' ">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <div class="navbar-nav col-md-6">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <div v-for="menu in menuItems">
                <li class="nav-item" v-if="menu.isLoggedIn">
                  <router-link class="nav-link" :to="menu.to">{{
                    menu.title
                  }}</router-link>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div class="navbar-nav col-md-6">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="!status.loggedIn">
              <div class="dropdown">
                <a id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><ion-icon
                    class="icon" name="person-outline"></ion-icon></a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <router-link class="dropdown-item" to="/bejelentkezes">Bejelentkezés</router-link>
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/regisztracio">Regisztráció</router-link>
                  </li>
                </ul>
                <router-link class="router-link" to="/cart"><ion-icon class="icon" name="cart-outline"></ion-icon>({{
                  data.countCartItems }})</router-link>
              </div>
            </li>
            
            
            <div v-if="status.loggedIn">
              <li class="nav-item" v-if="status.loggedIn">
                <a class="nav-link" href="#" @click="onLogout">Kijelentkezés</a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </body>
</template>


// const menuItems = computed(() => {
//   return [
//     {
//       title: "Nyitó oldal",
//       to: "/",
//       isLoggedIn: true,
//     },
//     {
//       title: "Termékek",
//       to: "/termekek",
//       isLoggedIn: true,
//     },
//   ];
// });



<!-- <div class="card" v-else>
          <div class="card-body">
              <table class="table table-responsive">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Termék</th>
                    <th>Mennyiség</th>
                    <th>Ár</th>
                    <th>Összesen</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data.cartItems" :key="item.ProductNumber">
                    <td>
                      <img :src="item.Image" class="fluid rounded" width="60" height="60" :alt="item.ProductName" />
                    </td>
                    <td>
                      {{ item.ProductName }}
                    </td>
                    <td>
                      <i @click="data.incrementQ(item)" class="bi bi-caret-up"></i>
                      <span class="mx-2">
                        {{ item.quantity }}
                      </span>
                      <i @click="data.decrementQ(item)" class="bi bi-caret-down"></i>
                    </td>
                    <td>{{ item.RetailPrice }} Ft</td>
                    <td>{{ item.RetailPrice * item.quantity }} Ft</td>
                    <td>
                      <i @click="data.removeFromCart(item)" class="bi bi-cart-x text-danger torles"></i>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="3" class="text-center">Fizetendő</th>
                    <td colSpan="3" class="text-center">
                      <span class="badge bg-danger rounded-pill">
                        {{
                          data.cartItems.reduce(
                            (acc, item) =>
                              (acc += item.RetailPrice * item.quantity),
                            0
                          )
                        }}
                        Ft
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div> -->