<template>
    <div class="container">
      <div class=" text-center ">
        <h1 class="py-5">Blog Page</h1>
  <div class="row"  v-if="productDetail">
          <div class="text-center col-lg-6">
            <img
              :src="productDetail.image"
              class="card-img-top w-50 p-3"
              :key="productDetail.image"
            />
          </div>
          <div class="card-body col-lg-6">
            <h5 class="card-title">{{ productDetail.title }}</h5>
            <h5 class="card-title">{{ productDetail.category }}</h5>
            <h5 class="card-title">{{ productDetail.price }}</h5>
            <p class="card-text">{{ productDetail.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const { id } = useRoute().params;
  const url = 'https://fakestoreapi.com/products/' + id;
  
  const productDetail = ref();


  onMounted(async () => {
    try {
      const { data : product} = await useFetch(url);
      // console.log("Fetched product:", product.value);
    productDetail.value = product.value;
    } catch (error) {
      // console.error('Error fetching product:', error);
    }
  });
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>
  