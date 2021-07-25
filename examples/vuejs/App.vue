
<template>
  <div>
    <div class="movies">
        <div class="movie" v-for="movie in movies" :key="movie.id">
            <img :src="movie.img"/>
        </div>
    </div>
    <a @click="nextHandler()" class="next">Next</a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

const catalog = [
  {
    title: "The Matrix",
    img: "https://media-cache.cinematerial.com/p/500x/uq49lqmo/the-matrix-movie-poster.jpg?v=1548664065"
  },
  {
    title: "Jurrasic Park",
    img: "https://media-cache.cinematerial.com/p/500x/4ubyv2go/jurassic-park-movie-poster.jpg?v=1456328203"
  },
  {
    title: "Indiana Jones",
    img: "https://cdn.shopify.com/s/files/1/0057/3728/3618/products/609df06d7c2b5fb3125f16a7e4e34152_592ed277-d9d9-4400-af4b-f793370e5f54_480x.progressive.jpg?v=1573616163"
  },
  {
    title: "2001, A space odyssey",
    img: "https://cdn.shopify.com/s/files/1/1416/8662/products/2001_a_space_odyssey_french_grande_linen_original_film_art_f_1200x.jpg?v=1587685085"
  }
]

let ias = null;

export default Vue.extend({
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    // Simulate initial load
    Promise.all([
      this.loadNewMovie(),
      this.loadNewMovie(),
      this.loadNewMovie(),
      this.loadNewMovie()
    ]).then(() => {
      ias = new InfiniteAjaxScroll('.movies', {
        item: '.movie',
        pagination: false,
      });

      ias.on('hit', () => {
        console.log("hit!!!")
        this.loadNewMovie()
      })
    })
  },
  methods: {
    loadNewMovie() {
      return new Promise((resolve) => {
        // Simulate loading of new movie
        setTimeout(() => {
          const index = Math.round((Math.random() * (catalog.length - 1)));
          const movie = {...catalog[index], id: this.movies.length + 1  };

          this.movies.push(movie)
          resolve()
        }, 2000)
      })
    },
    nextHandler() {
      this.loadNewMovie()
    }
  }
});
</script>

<style lang="scss" scoped>
  .movie {
    margin: 20px 0;
    padding: 20px 20px;
    width: 300px;
    background-color: #ff0000;
      img {
        width: 100%;
      }
  }
</style>
