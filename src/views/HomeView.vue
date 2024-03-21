<script setup>

</script>

<template>
  <div class="container" style="padding-top: 5rem; padding-bottom: 8rem;">
    <h1 class="display-6">Nyitó oldal</h1>


    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel ">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/img/gametrix.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../assets/img/logo.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../assets/img/logo2.jpeg" class="d-block w-100" alt="...">
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
</template>


<style scoped>
.carousel-inner{
    height: 30rem;
}

.item{
    height: 200px ;
    width:  200px ;
    border: 1px solid black;
}


.img{
    height: auto ;
    width:  auto ;

}
</style>