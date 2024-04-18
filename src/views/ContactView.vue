<template>
  <body>
  <div class="container pt-5">
    <div class="row mt-5">
      <div class="card col h-auto ">
        <div class="imgBox">
          <img src="src/assets/img/Discord.png"
            alt="" class="mouse">
        </div>
        <div class="contentBox">
          <h3>Discord</h3>
          <h5 class="price">Exklúzív akciókról és nyereményjátékok</h5>
          <a href="https://discord.gg/NR4awvcDPs" class="buy">Csatlakozás</a>
        </div>
      </div>
      <!-- Facebook kártya -->
      <div class="card col h-auto">
        <div class="imgBox">
          <img src="src/assets/img/facebook.png"
            alt="" class="mouse">
        </div>
        <div class="contentBox">
          <h3>Facebook</h3>
          <h5 class="price">Ha bármi kérdésed lenne buildekkel kapcsolatban</h5>
          <a href="https://www.facebook.com/people/GameStrix-Web%C3%A1ruh%C3%A1z/61557614525724/" target="_blank" class="buy">Felkeresés</a>
        </div>
      </div>
        <!-- Email kártya -->
      <div class="card col h-auto">
        <div class="imgBox">
          <img src="src/assets/img/gmail.png"
            alt="" class="mouse">
        </div>
        <div class="contentBox">
          <h3>Gmail</h3>
          <h5 class="price">Profi support bármivel kapcsolatban</h5>
          <a href="mailto:info.gamestrix@gmail.com" class="buy">Írás</a>
        </div>
      </div>
      <!-- Telefonszám kártya -->
       <div class="card col h-auto">
        <div class="imgBox">
          <img src="src/assets/img/phone.png"
            alt="" class="mouse">
        </div>
        <div class="contentBox">
          <h3>Telefonszám</h3>
          <h5 class="price">Gyors válasz hétfőtöl péntekig 16:00-ig</h5>
          <a href="tel:+3612345678" class="buy">Hívás</a>
        </div>
      </div>
    </div>
    </div>
    
     
      <!-- Telefonszám kártya -->
      

  
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.1059420735237!2d17.627755977293848!3d47.682362471197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476bbffacc7d0121%3A0x3c21b0233aee52f!2sGy%C5%91ri%20Szakk%C3%A9pz%C3%A9si%20Centrum%20Jedlik%20%C3%81nyos%20G%C3%A9pipari%20%C3%A9s%20Informatikai%20Technikum%20%C3%A9s%20Koll%C3%A9gium!5e0!3m2!1shu!2shu!4v1713250939631!5m2!1shu!2shu"
            width="100%" height="400" style="border:2px solid black;" allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </p>
      </div>
    </div>
  </div>

</body>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Istok Web", sans-serif;
}

body {
 min-height: 100vh;
    background: #6aa7ff;
}

.card {
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 30px;
  position: relative;
  width: 320px;
  height: 480px;
  background: #191919;
  border-radius: 20px;
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  top: -50%;
  width: 100%;
  height: 100%;
  background: #4070f4;
  transform: skewY(345deg);
  transition: 0.5s;
}

.card:hover::before {
  top: -70%;
  transform: skewY(390deg);
}

.card::after {
  content: "CORSAIR";
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: 600;
  font-size: 6em;
  color: rgba(0, 0, 0, 0.1);
}

.card .imgBox {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  z-index: 1;
}

/*
.card .imgBox img {
    max-width: 100%;
    
    transition: .5s;
}

.card:hover .imgBox img {
    max-width: 50%;
      
}
*/
.card .contentBox {
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
}

.card .contentBox h3 {
  font-size: 18px;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card .contentBox .price {
  font-size: 24px;
  color: white;
  font-weight: 700;
  letter-spacing: 1px;
}

.card .contentBox .buy {
  position: relative;
  top: 100px;
  opacity: 0;
  padding: 10px 30px;
  margin-top: 15px;
  color: #000000;
  text-decoration: none;
  background: white;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.5s;
}

.card:hover .contentBox .buy {
  top: 0;
  opacity: 1;
}

.mouse {
  height: 300px;
  width: auto;
}
h5{
  justify-content: center;
  text-align: center;
}
h3{
  margin-bottom: 2px;
}
</style>