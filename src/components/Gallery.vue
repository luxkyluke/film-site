
<template>
  <div class="gallery">
    <h1 class="gallery__title">{{ title }}</h1>
    <photos
      v-bind:photos ="photos"
      :currentId = "currentPhotoId"
    ></photos>
    <slider
      v-bind:photos ="photos"
      :currentId = "currentPhotoId"
    ></slider>
    
  </div>
</template>

<script>
import Photos from '@/components/Photos'
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
    'photos': Photos,
    'slider': Slider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  @import '~sass/main';
  .gallery{
    &__title{
      font-weight: 200;
      display: flex;
      justify-content:center;
      margin-top: $generalMargin;
    }
  }
</style>
