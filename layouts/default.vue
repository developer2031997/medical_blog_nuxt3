<template>
 
        <nav class="navbar navbar-expand-lg bg-body-tertiary shadow">
  <div class="container-fluid">
    <NuxtLink class="navbar-brand"  to="/">Blog Website</NuxtLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" ><NuxtLink to="/">Home</NuxtLink></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ><NuxtLink to="/blog">Blogs</NuxtLink></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ><NuxtLink to="/about">About Us</NuxtLink></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" ><NuxtLink to="/posts">Posts</NuxtLink></a>
        </li>

      </ul>
      <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
    </div>
  </div>
</nav>
   
       


  <div class="">
    <slot />

</div>
   
</template>

<script setup>

</script>

<style scoped>
a,NuxtLink{
  text-decoration: none;
}
</style>