<template>
 
        <nav class="navbar navbar-expand-lg bg-body-tertiary shadow" :class="{ 'sticky-nav': isSticky }">
  <div class="container-fluid">
   <div class="">
    <NuxtLink class="navbar-brand"  to="/">Medical Blog Website</NuxtLink>
   </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <p class="nav-link active" aria-current="page" ><NuxtLink to="/">Home</NuxtLink></p>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link" ><NuxtLink to="/blog">Blogs</NuxtLink></a>
        </li> -->
        <li class="nav-item">
          <p class="nav-link" ><NuxtLink to="/posts">Posts</NuxtLink></p>
        </li>
        <li class="nav-item">
          <p class="nav-link" ><NuxtLink to="/about">About Us</NuxtLink></p>
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
const isSticky = ref(false);

const handleScroll = () => {
  if (window.pageYOffset > 200) {
    isSticky.value = true;
  } else {
    isSticky.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
a, NuxtLink{
  text-decoration: none;
}
p{
  padding-bottom: 0;
}
.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: fadeInOut 0.3s ease;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>