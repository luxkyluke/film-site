
<template>
  <div class="gallery">
    <h1 class="gallery__title">{{ title }}</h1>
    <photo-library
      v-bind:photos ="photos"
      :currentId = "currentPhotoId"
    ></photo-library>
    <slider
      v-bind:photos ="photos"
      :currentId = "currentPhotoId"
    ></slider>
    
  </div>
</template>

<script>
import PhotoLibrary from '@/components/PhotoLibrary'
import Slider from '@/components/Slider'
import PhotoApi from '@/api/PhotoApi.js'

export default {
  name: 'Gallery',
  data () {
    return {
      photos: PhotoApi.all(),
      title: 'Film Photography',
      currentPhotoId: 0
    }
  },
  components: {
    'photo-library': PhotoLibrary,
    'slider': Slider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~sass/main';
  .gallery{

    &__title{
      display: flex;
      justify-content:center;
      margin-top: $generalMargin;
    }
  }
</style>
