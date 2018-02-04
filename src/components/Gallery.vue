
<template>
  <div class="gallery">
    <h1 class="gallery__title">Photographies Argentiques</h1>
    <PhotoLibrary></PhotoLibrary>
    <Slider
      v-bind:photos="photos"
    ></Slider>
  </div>
</template>

<script>
export default {
  name: 'PhotoLibrary',
  params : [PhotoApi],
  data () {
    return {
      photos: PhotoApi.get();
    }
  },
  components:{
    PhotoLibrary,
    Slider
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  
</style>
