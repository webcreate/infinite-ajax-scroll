
<template>
  <div>
    <div class="movies">
        <div class="movie" v-for="movie in movies" :key="movie.id">
            <img :src="movie.img"/>
        </div>
    </div>
    <div class="loader" v-if="isLoading"></div>
    <div class="last" v-if="isLast">No more movies 😒</div>
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

export default Vue.extend({
  data() {
    return {
      ias: null,
      isLast: false,
      isLoading: false,
      movies: []
    };
  },
  mounted() {
    const ias = new InfiniteAjaxScroll('.movies', {
      item: '.movie',
      next: this.nextPage,
      spinner: {
        show: () => this.isLoading = true,
        hide: () => this.isLoading = false,
      },
    });

    ias.on('last', () => {
      this.isLast = true;
    });
  },
  methods: {
    nextPage(pageIndex) {
      const hasNextUrl = pageIndex < 4;

      return Promise.all([
        this.loadNewMovie(),
        this.loadNewMovie(),
        this.loadNewMovie()
      ]).then(() => hasNextUrl);
    },
    loadNewMovie() {
      return new Promise((resolve) => {
        // Simulate loading of new movie
        setTimeout(() => {
          const index = Math.round((Math.random() * (catalog.length - 1)));
          const movie = {...catalog[index], id: this.movies.length + 1  };

          this.movies.push(movie)
          resolve()
        }, 200)
      })
    }
  }
});
</script>

<style lang="scss" scoped>
  .movies {
    margin: 0 auto;
    padding: 20px;
    max-width: 300px;
  }
  .movie {
    margin-top: 20px;
    padding: 20px;
    background-image: linear-gradient(to right, #EE0979 0%, #F73D39 20%);
      img {
        width: 100%;
      }
  }

  .last {
    font-family: sans-serif;
    text-align: center;
    color: #999;
    line-height: 40px;
  }

  .loader {
    height: 40px;
    background: transparent url('loader.svg') no-repeat center center;
    background-size: 40px 19px;
    animation: flipAnimation 1s infinite;
  }

  @keyframes flipAnimation {
    0%,100% { transform: rotateY(-180deg); }
    50% { transform: rotateY(0deg); }
  }
</style>
