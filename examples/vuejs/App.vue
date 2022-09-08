
<template>
  <div class="container">
    <div class="images">
        <div class="image" v-for="image in loadedImages" :key="image.id">
            <img :src="image.img" :alt="image.title" width="300" height="448"/>
        </div>
    </div>
    <div class="loader" v-if="isLoading"></div>
    <div class="last" v-if="isLast">No more image 😒</div>
  </div>
</template>

<script lang="js">
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

export default {
  data() {
    return {
      isLast: false,
      isLoading: false,
      images: [
        'https://m.media-amazon.com/images/M/MV5BYzFjNzIxMmEtMzY5NS00YTgzLTkwYWEtN2FjMmY0NmNkZWY3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://m.media-amazon.com/images/M/MV5BMTM1MTk2ODQxNV5BMl5BanBnXkFtZTcwOTY5MDg0NA@@._V1_SX300.jpg',
        'https://m.media-amazon.com/images/M/MV5BMzRiMGE2MmMtM2RhMy00OWNiLTljYTktOThmMmE1YjY1NjYyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
        'https://ia.media-imdb.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://ia.media-imdb.com/images/M/MV5BNWMxZTgzMWEtMTU0Zi00NDc5LWFkZjctMzUxNDIyNzZiMmNjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://m.media-amazon.com/images/M/MV5BYTk5NWE2ZjAtZmRmOS00ZGYzLWI5ZmUtMDcwODI0YWY0MTRlL2ltYWdlXkEyXkFqcGdeQXVyNjQzNDI3NzY@._V1_SX300.jpg',
        'https://m.media-amazon.com/images/M/MV5BYjZlYmJjYWYtZDM0NS00YmZlLWIyMTAtMDY5ZTNjZTgwMDhjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://ia.media-imdb.com/images/M/MV5BNzM4Y2FlNzYtZmY5Yy00NzU4LTk1ODItY2NjYWYzYzUyZGM3L2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://ia.media-imdb.com/images/M/MV5BNjFlOTI2OGQtMzg0YS00ZGE4LTkwMjEtZDUzYThlOTU5YjQ5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        'https://m.media-amazon.com/images/M/MV5BYTUwMTY1YmMtN2U5NC00YjkzLTg0YWQtZmEwNTEzZjdkNzQ2XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      ],
      loadedImages: [],
    };
  },
  mounted() {
    const ias = new InfiniteAjaxScroll('.images', {
      item: '.image',
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
        this.loadNewImage(),
        this.loadNewImage(),
        this.loadNewImage(),
      ]).then(() => hasNextUrl);
    },
    loadNewImage() {
      return new Promise((resolve) => {
        // Simulate loading of new image
        setTimeout(() => {
          this.loadedImages.push({
            id: this.loadedImages.length + 1,
            title: `A nice image random image at position ${this.loadedImages.length + 1}`,
            img: this.images[this.loadedImages.length % this.images.length],
          })
          resolve()
        }, 400)
      })
    }
  }
};
</script>

<style lang="css" scoped>
  .container {
    margin-top: 48px;
  }

  .images {
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .image {
    padding: 20px;
    border: 10px solid #666;
  }
  .image img {
    width: 100%;
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
