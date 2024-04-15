<script setup>

</script>

<template>
  <div class="container" style="padding-top: 5rem; padding-bottom: 8rem;">
    <!-- Bevezető szöveg -->
    <div class="row mb-4">
      <div class="col text-center">
        <h1 style="font-family: 'Roboto', sans-serif; font-size: 3.5rem; font-weight: bold; color: #333;">Üdvözöllek a
          GameStrix Hardver Webáruházában!</h1>
          <br>
        <h2 style="font-family: 'Open Sans', sans-serif; font-size: 2rem; color: #666;">Fedezd fel a legjobb ajánlatainkat!</h2>
      </div>
    </div>


    <div class="row">
      <!-- Carousel -->
      <div class="col">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../assets/img/1carou.png" class="d-block w-100" alt="Slide 1">
            </div>
            <div class="carousel-item">
              <img src="../assets/img/2carou.png" class="d-block w-100" alt="Slide 2">
            </div>
            <div class="carousel-item">
              <img src="../assets/img/3carou.png" class="d-block w-100" alt="Slide 3">
            </div>
            <div class="carousel-item">
              <img src="../assets/img/4carou.png" class="d-block w-100" alt="Slide 4">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Termékkártyák -->
    <div class="row mt-4">
      <div class="col">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card h-100">
              <img src="../assets/img/product1.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Termék 1</h5>
                <p class="card-text">Rövid leírás a termékről. Kattints a részletekért!</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src="../assets/img/product2.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Termék 2</h5>
                <p class="card-text">Rövid leírás a termékről. Kattints a részletekért!</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card h-100">
              <img src="../assets/img/product3.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Termék 3</h5>
                <p class="card-text">Rövid leírás a termékről. Kattints a részletekért!</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.carousel-inner img {
  height: auto;
  width: 100%;
}
</style>
