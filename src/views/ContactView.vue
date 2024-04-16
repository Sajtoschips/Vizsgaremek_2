<template>
  <div class="container mt-5 pt-5">
    <h1 class="text-center mb-4">Kapcsolat</h1>
    <div class="row">
      <!-- Discord kártya -->
      <div class="col-md-3 mb-4" style="border:2px solid black;">
        <div class="card text-center">
          <img src="../assets/img/Discord2.png" class="card-img-top img-fluid" alt="Discord">
          <div class="card-body">
            <h5 class="card-title">Discord</h5>
            <p class="card-text">Csatlakozz hozzánk a Discord szerverünkön!</p>
            <a href="https://discord.gg/NR4awvcDPs" target="_blank" class="btn btn-primary">Csatlakozás</a>
          </div>
        </div>
      </div>
      <!-- Facebook kártya -->
      <div class="col-md-3 mb-4" style="border:2px solid black;">
        <div class="card text-center">
          <img src="../assets/img/facebook.png" class="card-img-top img-fluid" alt="Facebook">
          <div class="card-body">
            <h5 class="card-title">Facebook</h5>
            <p class="card-text">Kövess minket a Facebookon!</p>
            <a href="https://www.facebook.com/people/GameStrix-Web%C3%A1ruh%C3%A1z/61557614525724/" target="_blank"
              class="btn btn-primary">Követés</a>
          </div>
        </div>
      </div>
      <!-- Email kártya -->
      <div class="col-md-3 mb-4" style="border:2px solid black;">
        <div class="card text-center">
          <img src="../assets/img/gmail.png" class="card-img-top img-fluid" alt="Email">
          <div class="card-body">
            <h5 class="card-title">Email</h5>
            <p class="card-text">Írj nekünk az alábbi címre: info.gamestrix@gmail.com</p>
            <a href="mailto:info.gamestrix@gmail.com" class="btn btn-primary">Írás</a>
          </div>
        </div>
      </div>
      <!-- Telefonszám kártya -->
      <div class="col-md-3 mb-4" style="border:2px solid black;">
        <div class="card text-center">
          <img src="../assets/img/phone.png" class="card-img-top img-fluid" alt="Telefonszám">
          <div class="card-body">
            <h5 class="card-title">Telefonszám</h5>
            <p class="card-text">Hívj minket: +36 1 234 5678</p>
            <a href="tel:+3612345678" class="btn btn-primary">Hívás</a>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.1059420735237!2d17.627755977293848!3d47.682362471197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476bbffacc7d0121%3A0x3c21b0233aee52f!2sGy%C5%91ri%20Szakk%C3%A9pz%C3%A9si%20Centrum%20Jedlik%20%C3%81nyos%20G%C3%A9pipari%20%C3%A9s%20Informatikai%20Technikum%20%C3%A9s%20Koll%C3%A9gium!5e0!3m2!1shu!2shu!4v1713250939631!5m2!1shu!2shu"
            width="800" height="600" style="border:2px solid black;" allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </p>
      </div>
    </div>
  </div>


</template>

<style scoped>
.card {
  transition: transform 0.3s;
  height: 100%;
}



.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  height: 200px;
  /* Állítsd be a megfelelő méretet */
  object-fit: cover;
}
</style>