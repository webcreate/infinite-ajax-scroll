
<template>
  <div class="movies">
      <div class="movie" v-for="movie in movies" :key="movie.id">
          <img :src="movie.img"/>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

export default Vue.extend({
  data() {
    return {
      movies: [
        {
          id: 1,
          title: "The Matrix",
          img: "https://media-cache.cinematerial.com/p/500x/uq49lqmo/the-matrix-movie-poster.jpg?v=1548664065"
        },
        {
          id: 2,
          title: "Jurrasic Park",
          img: "https://media-cache.cinematerial.com/p/500x/4ubyv2go/jurassic-park-movie-poster.jpg?v=1456328203"
        },
        {
          id: 3,
          title: "Indiana Jones",
          img: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/609df06d7c2b5fb3125f16a7e4e34152_592ed277-d9d9-4400-af4b-f793370e5f54_480x.progressive.jpg?v=1573616163"
        }
      ]
    };
  },
  mounted() {
    window.ias = new InfiniteAjaxScroll('.movies', {
      item: '.movie',
      next: () => {
        console.log("Next")
      },
      pagination: false,
      bind: false
    });

    setTimeout(() => {
       ias.bind();
    }, 5000)
  }
});
</script>

<style lang="scss" scoped>

</style>