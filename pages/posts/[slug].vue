

<template>
<div class="container">
  <div class="row py-5">
    <div class="col-lg-12">
      <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
          <div class="text-center ">
          <h1 class="text-4xl font-bold lg:w-2/3 mx-auto">{{ doc.title }}</h1>
          <p class="text-gray-500 text-sm mt-2">{{ doc.date }}</p>
        </div>

        <div class="text-center">
          <img
          v-if="doc.thumbnail"
          :src="doc.thumbnail"
          :alt="doc.title"
          class="img-fluid my-3"
        />
        </div>

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
</style>