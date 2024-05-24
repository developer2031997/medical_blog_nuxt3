<template>
  <div class="container">
    <div class="row py-5 justify-content-center">
      <div class="col-lg-12 text-center">
        <form class="row g-3 justify-content-end" @submit.prevent="handleSearch">
          <div class="col-auto">
            <input type="text" v-model="search" @input="textsearch" class="form-control" id="inputPassword2" placeholder="Search Here ..">
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary mb-3">Search</button>
          </div>
          <!-- {{ search }} -->
        </form>
      </div>
      <div class="col-lg-12">
        <div class="row justify-content-between">
          <ContentList path="/posts" :query="{
            draft: false,
            sort: [{ date: -1 }]
          }" v-slot="{ list }">
            <div v-for="article in list" :key="article._id" class="card col-lg-4 my-3" style="width: 23rem;">

              <img v-if="article.thumbnail" :src="article.thumbnail" class="img-fluid" alt="Thumbnail">
              <hr />

              <div class="card-body">
                <h2 class="card-title">
                  <NuxtLink :to="`/posts/${article.slug}`">{{ article.title }}</NuxtLink>
                </h2>
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

<script setup>
 useHead({
  title: "Nuxt Content Medical Blog"
})


const search = ref('');
const textsearch = () => {
  console.log('Search query:', search.value);
};

const handleSearch = () => {
  console.log('Search query:', search.value);
  search.value = "";
};

</script> 

<style>
a {
  text-decoration: none;
  color: #000;
}

.card {
  box-shadow: 0 0 10px #ddd;
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0 0 10px #000;

}

img {
  border-radius: 20px;

}

body {
  background: #F8F9FA;
}
</style>
