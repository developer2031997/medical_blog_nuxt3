//add filter by category option

<template>
    <div class="container">
      <div class="row py-5 justify-content-center">
        <div class="col-lg-12 text-center pb-4">
          <form class="row g-3 justify-content-center" @submit="serchPost">
            <div class="col-auto">
              <input type="text" v-model="search" @input="textsearch" class="form-control post-input" id="inputPassword2"
                placeholder="Search Article Here.." >
            </div>
            <div class="col-auto">
              <select v-model="selectedFilter" @change="applyFilter" class="form-select">
                <option disabled value="">Sort By</option>
                <option value="alphabetasc">Sort By Alphabets Asc</option>
                <option value="alphabetdesc">Sort By Alphabets Desc</option>
                <option value="dateasc">Sort By Date & Time Asc</option>
                <option value="datedesc">Sort By Date & Time Desc</option>
              </select>
            </div>  
            <div class="col-auto">
            <select v-model="selectedCategory" @change="applyFilter" class="form-select" :disabled="isCategoryDisabled">
              <option disabled value="">Filter By Category</option>
              <option v-for="category in categories" :key="category" :value="category" class="py-5">{{category}}  ({{ getCategoryCount(category) }})</option>
            </select>
          </div>
          <div class="col-auto">
            <a href="" class="btn btn-clear" @click="clearFilter">Clear</a>
          </div>
          <!-- <div class="col-auto" v-if="selectedCategory">
            <select v-model="selectedSubCategory" @change="applyFilter" class="form-select">
              <option disabled value="">Filter By Subcategory</option>
              <option v-for="subCategory in subCategories[selectedCategory]" :key="subCategory" :value="subCategory">{{ subCategory }}</option>
            </select>
          </div> -->
            <!-- {{ search }} -->
          </form>
        </div>
        <hr/>
        <div class="col-lg-12">
          <!-- <p v-if="loading"> data fetching..</p> -->
          <div v-if="filteredPosts" class="row justify-content-around">
            <div v-for="article in filteredPosts" :key="article._id" class="card col-lg-4 my-4" style="width: 21.5rem;">
                <NuxtLink :to="`/posts/${article.slug}`">
                <img v-if="article.thumbnail" :src="article.thumbnail" class="img-fluid w-100" alt="Thumbnail">
              <hr />
              <div class="card-body">
                <h4 class="card-title">
                  {{ article.title }}
                </h4>
                <div v-if="article.tags">
                  <p v-for="tag in article.tags" :key="tag" class="mx-1 badge post-tag p-2">{{ tag }}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p><b>Date : {{article.date}}</b></p>
                  <p><b>{{article.time}}</b></p>
                </div>
              </div>
            </NuxtLink>
            </div>
          </div>
          
          <div v-if="loading" class="row text-center py-5">
            <h2>Data Is fetching, please wait ....</h2>
          </div>

          <div v-if="noDataFound" class="row text-center py-5">
            <h2>Article not found...</h2>
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
  const loading = ref(true);

  const selectedCategory = ref('');
  const categories = ref([]);
  const noDataFound = ref();

// const selectedSubCategory = ref('');
// const subCategories = ref({
//   Health: ['Nutrition', 'Exercise', 'Mental Health'],
//   Wellness: ['Yoga', 'Meditation', 'Lifestyle'],
//   Medicine: ['Vaccination', 'Diseases', 'Treatments']
// });
  
  const fetchArticles = async () => {
    try {
      const data = await queryContent('posts').find();
      articles.value = data;
      filteredPosts.value = data;
      loading.value = false;
      // console.log("Inside articles", articles.value);

      const allTags = articles.value.flatMap(article => article.tags || []);
      categories.value = [...new Set(allTags)];
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };
  
  const serchPost = (e) => {
    e.preventDefault();
  }
  
  
  watch(search, (newValue) => {
    selectedCategory.value = ''; // Clear selected category
  applyFilter(); // Apply filters after resetting the category


    const searchTerm = newValue.toLowerCase();
    if (searchTerm.trim() === "") {
      filteredPosts.value = articles.value;
    }
     else {
      filteredPosts.value = articles.value.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      );
    }
    // Check if filtered posts array is empty
        if (filteredPosts.value.length === 0) {
            // Set a flag to indicate no data was found
            noDataFound.value = true;
        } else {
            // Reset the flag if data is found
            noDataFound.value = false;
        }
  });
  
  const applyFilter = () => {
//     if (selectedFilter.value === 'dateasc') {
//       filteredPosts.value.sort((a, b) => {
//         console.log('aDate:',typeof  a.date, a.date); 
//           console.log('bTime:', typeof a.time,a.time); 
//           console.log('bDate:', typeof b.date,b.date); 
//           console.log('bTime:', typeof b.time,b.time);
  
//         const aDateTime = new Date(`${a.date} ${a.time}`);
//         const bDateTime = new Date(`${b.date} ${b.time}`);
        
//           console.log('aDateTime:', aDateTime); 
//           console.log('bDateTime:', bDateTime);
  
//           if (aDateTime < bDateTime) {
//               return -1;
//           } else if (aDateTime > bDateTime) {
//               return 1;
//           } else {
//               return 0;
//           }
//       });
//   }
//   else if(selectedFilter.value === 'datedesc'){
//     filteredPosts.value.sort((a, b) => {
//         const aDateTime = new Date(`${a.date} ${a.time}`);
//         const bDateTime = new Date(`${b.date} ${b.time}`);
        
//           console.log('aDateTime:', aDateTime); 
//           console.log('bDateTime:', bDateTime);
  
//           if (aDateTime < bDateTime) {
//               return 1;
//           } else if (aDateTime > bDateTime) {
//               return -1;
//           } else {
//               return 0;
//           }
//       });
  
//   }
//    else if (selectedFilter.value === 'alphabetasc') {
//       filteredPosts.value.sort((a, b) => a.title.localeCompare(b.title));
//     }
//     else if (selectedFilter.value === 'alphabetdesc') {
//       filteredPosts.value.sort((a, b) => b.title.localeCompare(a.title));
//     }
let tempPosts = [...articles.value];
// console.log("select",selectedCategory.value)
// console.log("selectedCategory.value",selectedCategory.value)

if (selectedCategory.value) {
  tempPosts = tempPosts.filter((article) => {
    return article.tags && article.tags.some(tag => tag.includes(selectedCategory.value));
  });
  console.log("Filtered tempPosts:", tempPosts);
}

// if (selectedSubCategory.value) {
//   tempPosts = tempPosts.filter(article => article.subCategory === selectedSubCategory.value);
// }

// if (selectedFilter.value === 'dateasc') {
//   tempPosts.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
// } else if (selectedFilter.value === 'datedesc') {
//   tempPosts.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));
// } else if (selectedFilter.value === 'alphabetasc') {
//   tempPosts.sort((a, b) => a.title.localeCompare(b.title));
// } else if (selectedFilter.value === 'alphabetdesc') {
//   tempPosts.sort((a, b) => b.title.localeCompare(a.title));
// }
// console.log("before",filteredPosts.value )

switch (selectedFilter.value) {
    case 'dateasc':
      tempPosts = tempPosts.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
      break;
    case 'datedesc':
      tempPosts = tempPosts.sort((a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`));
      break;
    case 'alphabetasc':
      tempPosts = tempPosts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'alphabetdesc':
      tempPosts = tempPosts.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

filteredPosts.value = tempPosts;
// console.log("after",filteredPosts.value )
};

const isCategoryDisabled = computed(() => {
  return search.value.trim().length > 0;
});

const getCategoryCount = (category) => {
  return articles.value.filter(article => article.tags && article.tags.includes(category)).length;
};

const clearFilter = ()=>{
    filteredPosts.value = articles.value;
}

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
  hr {
    border: 1.5px solid dark; /* Change the color to dark */
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
    border-radius: 40px;
    background-color: #f9f9f9;
  }
  .card:hover {
    /* box-shadow: 0 0 10px #000;*/
        /* box-shadow: 0 0 0 2px #003A70;  */
        transition: all 0.4s ease-in-out;
        transform: scale(1.05);
  
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
  .card-body {
      padding: 0px 15px;
  }
  .btn-clear{
    background-color:#003A70 ;
    /* padding: 6px 20px; */
    color: #fff;
    font-weight: 600;
  }
  .btn-clear:hover{
    background-color: #ddd;
  }
  </style>
    