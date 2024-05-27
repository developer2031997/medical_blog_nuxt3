<template>
  <div class="container">
    <div class="row py-5 justify-content-center">
      <div class="col-lg-12 text-center pb-4">
        <form class="row g-3 justify-content-center" @submit="serchPost">
          <div class="col-auto">
            <input type="text" v-model="search" @input="textsearch" class="form-control post-input" id="inputPassword2"
              placeholder="Search Article Here..">
          </div>
          <div class="col-auto">
            <select v-model="selectedFilter" @change="applyFilter" class="form-select">
              <option disabled value="">Filters Articles</option>
              <option value="alphabetasc">Sort By Alphabets Asc</option>
              <option value="alphabetdesc">Sort By Alphabets Desc</option>
              <option value="dateasc">Sort By Date & Time Asc</option>
              <option value="datedesc">Sort By Date & Time Desc</option>
            </select>
          </div>  
          <!-- {{ search }} -->
        </form>
      </div>
      <div class="col-lg-12">
        <div v-if="filteredPosts" class="row justify-content-around">
          <div v-for="article in filteredPosts" :key="article._id" class="card col-lg-4 my-4" style="width: 21.5rem;">

            <img v-if="article.thumbnail" :src="article.thumbnail" class="img-fluid" alt="Thumbnail">
            <hr />

            <div class="card-body">
              <h2 class="card-title">
                <NuxtLink :to="`/posts/${article.slug}`">{{ article.title }}</NuxtLink>
              </h2>
              <div v-if="article.tags">
                <p v-for="tag in article.tags" :key="tag" class="mx-1 badge post-tag p-2">{{ tag }}</p>
              </div>
            </div>
          </div>

        </div>

        <div v-else>
          <p>Article not found.</p>
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
const articles = ref([]);
const filteredPosts = ref([]);
const selectedFilter = ref('');

const fetchArticles = async () => {
  try {
    const data = await queryContent('posts').find();
    articles.value = data;
    filteredPosts.value = data;
    // console.log("Inside articles", articles.value);
  } catch (err) {
    console.error('Error fetching articles:', err);
  }
};

const serchPost = (e) => {
  e.preventDefault();
}


watch(search, (newValue) => {
  const searchTerm = newValue.toLowerCase();
  if (searchTerm.trim() === "") {
    filteredPosts.value = articles.value;
  } else {
    filteredPosts.value = articles.value.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  }
});

const applyFilter = () => {
  if (selectedFilter.value === 'dateasc') {
    filteredPosts.value.sort((a, b) => {
      console.log('aDate:',typeof  a.date, a.date); 
        console.log('bTime:', typeof a.time,a.time); 
        console.log('bDate:', typeof b.date,b.date); 
        console.log('bTime:', typeof b.time,b.time);

      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      
        console.log('aDateTime:', aDateTime); 
        console.log('bDateTime:', bDateTime);

        if (aDateTime < bDateTime) {
            return -1;
        } else if (aDateTime > bDateTime) {
            return 1;
        } else {
            return 0;
        }
    });
}
else if(selectedFilter.value === 'datedesc'){
  filteredPosts.value.sort((a, b) => {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      
        console.log('aDateTime:', aDateTime); 
        console.log('bDateTime:', bDateTime);

        if (aDateTime < bDateTime) {
            return 1;
        } else if (aDateTime > bDateTime) {
            return -1;
        } else {
            return 0;
        }
    });

}
 else if (selectedFilter.value === 'alphabetasc') {
    filteredPosts.value.sort((a, b) => a.title.localeCompare(b.title));
  }
  else if (selectedFilter.value === 'alphabetdesc') {
    filteredPosts.value.sort((a, b) => b.title.localeCompare(a.title));
  }
  
};

onMounted(fetchArticles);


</script>

<style>
a {
  text-decoration: none;
  color: #000;
}
::placeholder {
  color: #ddd!important;
}
input#inputPassword2 ,select.form-select, select option[disabled] , .post-tag{
    background: #003A70;
    color: #fff;
}
select.form-select option:hover{
  background-color: #ddd!important;
}
.card {
  /* box-shadow: 0 0 10px #ddd; */
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  border-radius: 20px;
  background-color: #f9f9f9;
}

.card:hover {
  /* box-shadow: 0 0 10px #000;*/
      /* box-shadow: 0 0 0 2px #003A70;  */
      transform: scale(1.03);

}

img {
  border-radius: 20px;

}

body {
  background: #F8F9FA;
}

.post-input {
  width: 320px !important;
}
</style>


// const textsearch = () => {
// console.log('Search query:', search.value);
// };

// const handleSearch = () => {
// console.log('Search query:', search.value);
// search.value = "";
// }

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
  