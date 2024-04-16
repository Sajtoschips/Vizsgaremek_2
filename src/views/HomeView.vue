<script setup>





</script>

<template>
  <div class="container" style="padding-top: 5rem; padding-bottom: 8rem;">
    <!-- Bevezető szöveg -->
    <div class="row mb-4">
      <div class="col-lg-8 offset-lg-2 text-center">
        <h1 class="display-3">Üdvözöllek a GameStrix Hardver Webáruházában!</h1>
        <p class="lead">Fedezd fel a legjobb ajánlatainkat!</p>
      </div>
    </div>


    <div class="row mb-4">
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


    <!-- Akciós termékek -->
    <div class="row mb-4">
      <div class="col">
        <h2 class="mb-3">Akciós termékek</h2>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <!-- Akciós termék 1 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Akciós termék 1">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden. <br> Régi ár: <s>2000 Ft</s> <br> Új ár: 1500 Ft</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <!-- Akciós termék 2 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Akciós termék 2">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden. <br> Régi ár: <s>3000 Ft</s> <br> Új ár: 2500 Ft</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <!-- Akciós termék 3 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Akciós termék 3">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden. <br> Régi ár: <s>4000 Ft</s> <br> Új ár: 3500 Ft</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Népszerű termékek -->
    <div class="row mb-4">
      <div class="col">
        <h2 class="mb-3">Népszerű termékek</h2>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <!-- Népszerű termék 1 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Népszerű termék 1">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden.</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <!-- Népszerű termék 2 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Népszerű termék 2">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden.</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <!-- Népszerű termék 3 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Népszerű termék 3">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden.</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
          <!-- Népszerű termék 4 -->
          <div class="col">
            <div class="card h-100">
              <img src="" class="card-img-top" alt="Népszerű termék 4">
              <div class="card-body">
                <h5 class="card-title">Termék neve</h5>
                <p class="card-text">Leírás röviden.</p>
                <a href="#" class="btn btn-primary">Részletek</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  
    <!-- Hírlevél feliratkozó űrlap -->
    <div class="row mb-4">
      <div class="col-lg-6 offset-lg-3">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Iratkozz fel hírlevelünkre!</h3>
            <form>
              <div class="mb-3">
                <input type="email" class="form-control" id="emailInput" placeholder="Email cím">
              </div>
              <button type="submit" class="btn btn-primary btn-block">Feliratkozás</button>
              
            </form>
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