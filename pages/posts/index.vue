<template>
  <div class="container">
    <div class="row py-5 justify-content-center">
      <div class="col-lg-12 text-center pb-4">
        <form class="row g-3 justify-content-center" @submit="serchPost">
          <div class="col-auto">
            <input type="text" v-model="search" @input="textsearch" class="form-control " id="inputPassword2"
              placeholder="Search Here ..">
          </div>
          <div class="col-auto">
            <!-- <button type="submit" class="btn btn-primary mb-3">Search</button> -->
          </div>
          <!-- {{ search }} -->
        </form>
      </div>
      <div class="col-lg-12">
        <div class="row justify-content-between">

          <div v-for="article in filteredPosts" :key="article._id" class="card col-lg-4 my-3" style="width: 23rem;">

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
});

const search = ref('');
const articles = ref();
const filteredPosts = ref(articles);

const fetchArticles = async () => {
  try {
    const data = await queryContent('posts').find();
    articles.value = data;
    // console.log("Inside articles", articles.value);

  } catch (err) {
    error.value = err;
  }
};
onMounted(fetchArticles);

const serchPost = (e)=>{
e.preventDefault();
}

// const textsearch = computed(() => {
//   const searchTerm = search.value.toLowerCase();
//   // console.log("searchTerm",searchTerm)

//   watch(search, (newValue, oldValue) => {
//     if (searchTerm === "") {
// console.log("newValue",newValue);
// console.log("oldValue",oldValue);
//   }
// })

//   if (searchTerm === "") {
//      filteredPosts.value = articles.value;
//      console.log("filteredPosts blank", filteredPosts.value)
//   } else {
//     filteredPosts.value = articles.value.filter(article =>
//       article.title.toLowerCase().includes(searchTerm) ||
//       (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
//     );
//   }
// }
// );

watch(search, (newValue, oldValue) => {
  const searchTerm = newValue.toLowerCase();
  if (searchTerm === "") {
    // If search term is empty, reset filteredPosts to contain all articles
    filteredPosts.value = articles.value;
  } else {
    // Filter articles based on search term and update filteredPosts
    filteredPosts.value = articles.value.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
});

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
input{
  width: 600px!important;
}
</style>


// const textsearch = () => {
  //   console.log('Search query:', search.value);
  // };
  
  // const handleSearch = () => {
  //   console.log('Search query:', search.value);
  //   search.value = "";
  // }