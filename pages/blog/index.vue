<template>
    <div class="container">
      <div class="text-center row justify-content-between">
        <h1 class="py-5">Blog Page</h1>
        
        <div class="col-lg-4 my-2 card-parent" v-for="pro in product">
          <div class="card">
            <div class="text-center">
              <img
                :src="pro.image"
                class="card-img-top w-25 p-3"
                :key="pro.image"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{pro.title}}</h5>
              <h5 class="card-title">{{pro.category}}</h5>
              <h5 class="card-title">{{pro.price}}</h5>
              <h5 class="card-title">{{pro.rating.rate}}</h5>
  
              <p class="card-text">{{ pro.description }}</p>
              <NuxtLink :to="`/blog/${pro.id}`" class="btn btn-primary">Read More</NuxtLink>
            </div>
          </div>
        </div>
  
        <div class="col-lg-4" v-for="medi in medicine">
          <div class="card">
            <div class="text-center">
              <img
                :src="medi.image"
                class="card-img-top w-50 p-3"
                :key="medi.image"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{medi.title}}</h5>
              <h5 class="card-title">{{medi.category}}</h5>
              <h5 class="card-title">{{medi.price}}</h5>
              <h5 class="card-title">{{medi.rating.rate}}</h5>
  
              <p class="card-text">{{ medi.description }}</p>
              <!-- <NuxtLink :to="`/blog/${pro.id}`" class="btn btn-primary">Read More</NuxtLink> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  
  const product = ref('');
  const medicine = ref('');
  // console.log("Fetched medicine:", medicine.value);


  onMounted(async () => {
    try {
      const {data:products} =await useFetch('https://fakestoreapi.com/products');
      // console.log("Fetched medicine:", products.value);
      product.value = products.value;

      // const {data:medicines} =await useFetch('http://localhost:3000/medicine');
      // medicine.value = medicines.value;
    } catch (error) {
      // console.error('Error fetching product:', error);
    }
  });


  </script>
  <style  scoped>
  .card{
    border-radius: 50px;

  }
.card:hover{
box-shadow: 0 0 10px #000;;
}
</style>
  