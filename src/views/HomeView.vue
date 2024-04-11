<script setup>

</script>

<template>
  <div class="container" style="padding-top: 5rem; padding-bottom: 8rem;">
    <div class="row">

      <!-- List Group -->
      

      <!-- Carousel -->
      <div >
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-interval="2400" data-bs-ride="carousel">
          <div class="carousel-indicators ">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
              aria-label="Slide 4"></button>
            
          </div>
          <div class="carousel-inner"> <!-- Adjust carousel height here -->
            <div class="carousel-item active">
              <img src="../assets/img/1carou.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/img/2carou.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/img/3carou.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="../assets/img/4carou.png" class="d-block w-100" alt="...">
            </div>
          </div>
          <!-- <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button> -->
        </div>
      </div>

    </div>

    <!-- Tab Content -->
    <div class="row">
      <div class="col-12">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...
          </div>
          <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
          <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
          <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
        </div>
      </div>
    </div>


    <br>
    <br>
    <br>


    <h1 style="text-align: center;"> Legfontosabb Komponensek!</h1>


    <br>
    <br>
    <br>

    <div class="row">
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="../assets/img/kicsi.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Intel Processzoraink</h5>
            <p class="card-text">GeForce RTX 4060 + Intel i5-12400F</p>
            <a href="#" class="btn btn-primary">Kosárba</a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="../assets/img/közepes.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Nvidia Videokártyáink </h5>
            <p class="card-text">GeForce RTX 4070 + Intel i5-12500</p>
            <a href="#" class="btn btn-primary">Kosárba</a>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="../assets/img/nagy.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Veterán Gamereknek</h5>
            <p class="card-text">GeForce RTX 4090 + Intel Core i5-12600K</p>
            <a href="#" class="btn btn-primary">Kosárba</a>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>
.carousel-inner {
  height: auto;
  width: auto;
  /* Adjust carousel height here */
}

.item {
  height: 200px;
  width: 200px;
  border: 1px solid black;
}

.img {
  height: auto;
  width: auto;
}
</style>
