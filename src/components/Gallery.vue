
<template>
  <div class="gallery">
    <h1 class="gallery__title">{{ title }}</h1>
    <photos
      v-bind:photos ="photos"
      v-bind:currentId = "currentPhotoId"
      v-on:changeCurrentId ="changeCurrentPhoto"
    ></photos>
    <slider
      v-bind:photos ="photos"
      v-bind:currentId = "currentPhotoId"
      v-on:changeId = "changeCurrentPhoto"
    ></slider>
    {{currentPhotoId}}
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
      idPhoto : 0
    }
  },
  computed:{
    currentPhotoId: {
      get: function(){
        return  this.idPhoto
      },
      set: function(id){
        this.idPhoto = id
      }
    }
    
  },
  components: {
    'photos': Photos,
    'slider': Slider
  },
  methods:{
    changeCurrentPhoto : function (id) {
      if(id != this.currentPhotoId){
        console.log("change "+ id)
        this.currentPhotoId = id;
      }
    }
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
    &__center{
      width: 33.33vw;
      height: 100vh;
      position: absolute;
      transform: translateX(-50%);
      left : 50%;
      top:0;
      background-color:rgba(255, 0, 0, 0.5);
    }
  }
</style>
