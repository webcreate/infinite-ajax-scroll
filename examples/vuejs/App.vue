
<template>
  <div>
    <div class="images">
        <div class="image" v-for="image in images" :key="image.id">
            <img :src="image.img" :alt="image.title"/>
        </div>
    </div>
    <div class="loader" v-if="isLoading"></div>
    <div class="last" v-if="isLast">No more image 😒</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

export default Vue.extend({
  data() {
    return {
      ias: null,
      isLast: false,
      isLoading: false,
      images: []
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
        this.loadNewImage()
      ]).then(() => hasNextUrl);
    },
    loadNewImage() {
      return new Promise((resolve) => {
        // Simulate loading of new image
        setTimeout(() => {
          this.images.push({
            title: `A nice image random image at position ${this.images.length + 1}`,
            img: `https://picsum.photos/200/300?random=${this.images.length}`
          })
          resolve()
        }, 400)
      })
    }
  }
});
</script>

<style lang="scss" scoped>
  .images {
    margin: 0 auto;
    padding: 20px;
    max-width: 400px;
  }
  .image {
    margin-top: 20px;
    padding: 20px;
    border: 10px solid #666;

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
