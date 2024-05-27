

<template>
<div class="container">
  <div class="row py-5">
    <div class="col-lg-12">
      <nav aria-label="breadcrumb">
  <ol class="breadcrumb breadcrum-background p-2">
    <li class="breadcrumb-item active" aria-current="page">
      <NuxtLink :to="`/posts`"><b>Posts</b></NuxtLink></li> 
    <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
    <li v-if="doc" class="breadcrumb-item active" aria-current="page">{{ doc.title }}</li>
  </ContentDoc>
  </ol>
</nav>
    </div>
    <div class="col-lg-12">
      <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }" >
          <div class="text-center ">
          <h1 class="text-4xl font-bold lg:w-2/3 mx-auto">{{ doc.title }}</h1> <br/>
          <p class="text-gray-500 text-sm mt-2">{{ doc.date }}  {{ doc.time }}</p>
        </div>

        <div class="text-center">
          <img
          v-if="doc.thumbnail"
          :src="doc.thumbnail"
          :alt="doc.title"
          class="img-fluid my-3 w-50"
        />
        </div>
<!-- <hr/> -->
        <div class="py-3">
          <ContentRenderer :value="doc" />
        </div>
        </ContentDoc>
    </div>
  </div>
</div>

      
</template>

<script setup>
const { slug } = useRoute().params;
</script>

<style>
.breadcrum-background{
  background-color: #003A70;
  border-radius: 10px;
}
li.breadcrumb-item.active b, li.breadcrumb-item{
  color : #fff!important;
}
.breadcrumb-item+.breadcrumb-item::before{
  color : #fff!important;

}
</style>