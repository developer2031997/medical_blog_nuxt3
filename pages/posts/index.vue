<template>
  <div class="container">
    <div class="row py-5 justify-content-center">
      <!-- <div class="col-lg-10 text-center">
        <main class="d-flex text-center">
    <input v-model="search" class="w-50">
    <a class="btn btn-primary mx-3">Search</a>
  </main>
      </div> -->
      <div class="col-lg-12">
        <div class="row">        
        <ContentList
          path="/posts"
          :query="{
            draft: false,
            sort: [{ date: -1 }]
          }"
          v-slot="{ list }"
        >
          <div v-for="article in list" :key="article._id" class="card  m-2  col-lg-4" style="width: 25rem;">
      
          <img v-if="article.thumbnail" :src="article.thumbnail" class="img-fluid" alt="Thumbnail">
     
         <div class="card-body">
              <h2 class="card-title">
                <NuxtLink :to="`/posts/${article.slug}`">{{ article.title }}</NuxtLink></h2>
              <div v-if="article.tags">
                <p v-for="tag in article.tags" :key="tag" class="mx-1 badge bg-primary p-2">{{ tag }}</p>
              </div>
            </div>
          </div>
        </ContentList>
   
        </div>
      </div>
      <!-- <div  v-if="filteredPosts.length" v-else>
          <p>No posts found.</p>
        </div> -->
    </div>
  </div>
</template>

<!-- <script setup>
const search = ref('');
const { data:posts } = useFetch(async () => {
  const response = await queryContent('posts').find()
  return response;
})

const filteredPosts = computed(() => {
  if (!search.value) {
    return posts.value
  }
  const searchTerm = search.value.toLowerCase()
  return posts.value.filter(article =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.body.toLowerCase().includes(searchTerm) ||
    (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  )
})

useHead({
  title: "Nuxt Content Medical Blog"
})
</script> -->

<style>
a {
  text-decoration: none;
  color: #000;
}
.card{
box-shadow: 0 0 10px #ddd;
border-radius: 20px;
}
img{
border-radius: 20px;

}
body{
  background: #F8F9FA;
}
</style>
