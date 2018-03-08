
<template>
  <div class="gallery">
    <h1 class="gallery__title">{{ title }}</h1>
    <div class="middle"></div>
    <photo-full
      :src="this.currentImg.src"
      :isVisible="fullImgVisible"
      :isActive="false"
      :isPortrait="this.currentImg.portrait"
      :position="currentImg.mask"
    >
    </photo-full>
    <photos
      v-bind:photos ="photos"
      v-bind:currentId = "idPhoto"
      v-on:changeCurrentId ="changeCurrentSlider"
      @showFullImg="showFullImg"
      @hideFullImg="hideFullImg"
    ></photos>
    <slider
      v-bind:photos ="photos"
      v-bind:currentId = "idSlider"
      v-on:changeId = "changeCurrentPhoto"
    ></slider>
  </div>
</template>

<script>
import Photos from '@/components/Photos'
import Slider from '@/components/Slider'
import PhotoFull from '@/components/photos/PhotoFull'
import PhotoApi from '@/api/PhotoApi.js'

export default {
  name: 'Gallery',
  data () {
    return {
      photos: PhotoApi.all(),
      title: 'Film Photography',
      idPhoto : 0,
      idSlider : 0,
      fullImgVisible:false,
      idFullImg : 0
    }
  },
  computed:{
    currentImg(){
      return this.photos[this.idFullImg]
    } 
  },
  components: {
    'photos': Photos,
    'slider': Slider,
    'photo-full':PhotoFull,
  },
  methods:{
    changeCurrentPhoto : function (id) {
      if(id != this.idPhoto){
        this.idPhoto = id;
        this.idSlider = id;
      }
    },
    changeCurrentSlider : function (id) {
      if(id != this.idSlider){
        this.idSlider = id;
      }
    },
    showFullImg:function(id){
      this.idFullImg = id;
      this.fullImgVisible = true;
    },
    hideFullImg:function(){
      this.fullImgVisible = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  @import '~sass/main';
  .gallery{
    &>.middle{
      width: 2px;
      position: absolute;
      height: 100vh;
      top:0;
      transform: translateX(-50%);
      left: 50%;
      background-color: red;
      display: none;
    }
    &__title{
      font-weight: 400;
      display: flex;
      justify-content:center;
      margin-top: $generalMargin;
      font-size:2.5em;
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
