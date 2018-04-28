
<template>
  <div class="gallery" >
    
    <photo-full
      :photo="this.currentImg"
      :isVisible="fullImgVisible"
      :isActive="fullImgActivated"
      :position="currentImg.mask"
      @closeFullImg="closeFullImg"
    >
    </photo-full>
    <div class="gallery__content" ref="content">
        <div class="gallery__content__texte">
          <h1 class="gallery__content__title" :class="titleClass">{{ title }}</h1>
          <h2 class="gallery__content__subtitle" :class="titleClass">{{ subtitle }}</h2>
        </div>
      <div id="scrollablePhotos" class="gallery__content__wrapper">
        <photos
          class="gallery__content__photos"
          :class="(this.hideLoader) ? '' : 'hide'"
          v-bind:photos ="photos"
          v-bind:currentId = "idPhoto"
          v-on:changeCurrentId ="changeCurrentPhoto"
          :isBlocked = "isBocked"
          :showInfo = "showInfo"
          @showFullImg="showFullImg"
          @hideFullImg="hideFullImg"
          @openFullImg="openFullImg"
          @photosLoaded="handleLoaded"
        ></photos>
      </div>
        <slider
          class="gallery__content__slider"
          :class="(this.hideLoader) ? '' : 'hide'"
          v-bind:photos ="photos"
          v-bind:currentId = "idPhoto"
          v-on:changeId = "changeCurrentPhoto"
        ></slider>
      <loader :class="(this.hideLoader) ? 'hide' : ''" class="gallery__content__loader"></loader>
      <div class="gallery__copyright">
        <a class="gallery__copyright__label" target="_blank" href="http://antoinedemiere.com/#/about"><span>by</span> Antoine Demière</a>
      </div>
    </div>
  </div>
</template>

<script>
import Photos from '@/components/Photos'
import Slider from '@/components/Slider'
import Loader from '@/components/Loader'
import PhotoFull from '@/components/photos/PhotoFull'
import PhotoApi from '@/api/PhotoApi.js'
import Utility from '@/addons/utility.js'

export default {
  name: 'Gallery',
  data () {
    return {
      photos: PhotoApi.all(),
      title: 'Film Photography',
      subtitle: '35 photographs of my travel film',
      idPhoto : 0,
      fullImgVisible:false,
      showInfo:false,
      idFullImg : 0,
      fullImgActivated:false,
      hideLoader : false
    }
  },
  computed:{
    isBocked(){
      return this.fullImgActivated || !this.hideLoader;
    },
    currentImg(){
      return this.photos[this.idFullImg]
    },
    titleClass(){
      return ''
      // return (this.fullImgActivated) ? "hide" : ""
    }
  },
  components: {
    'photos': Photos,
    'slider': Slider,
    'photo-full':PhotoFull,
    'loader':Loader
  },
  methods:{
    changeCurrentPhoto : function (i) {
      const id = Utility.clamp(i, 0, this.photos.length-1)
      if(id != this.idPhoto && !this.fullImgActivated){
        this.idPhoto = id;
      }
    },
    showFullImg:function(id){
      this.idFullImg = id;
      this.fullImgVisible = true;
    },
    hideFullImg:function(){
      this.fullImgVisible = false || this.fullImgActivated;
      this.showInfo = false;
    },
    openFullImg:function(id){
      this.idFullImg = id;
      this.fullImgVisible = this.fullImgActivated = true;
      TweenMax.to(this.$refs.content, 0.75, {css:{opacity:0, display:'none'}})
    },
    closeFullImg:function(){
      this.fullImgActivated = false;
      this.hideFullImg();
      TweenMax.to(this.$refs.content, 0.75, {css:{opacity:1, display:'block'}})
      //this.showInfo = true;
    },
    handleKeyUp:function(e){
      if(e.keyCode == 39){//right arrow
        this.changeCurrentPhoto(this.idPhoto +1)
        this.showInfo =  true;
        this.showFullImg(this.idPhoto)
        return;
      }
      if(e.keyCode == 37){//left arrow
        this.changeCurrentPhoto(this.idPhoto -1)
        this.showInfo =  true;
        this.showFullImg(this.idPhoto)
        return;
      }
      if(e.keyCode == 13){//enter key
        this.openFullImg(this.idPhoto)
        return;
      }
    },
    handleLoaded:function(){
      this.hideLoader = true;
    }
  },
  created(){
    window.addEventListener('keyup', this.handleKeyUp);
  },
  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  @import '~sass/main';
  .gallery{
    @extend .unselectable;
    @extend .full;
    position: fixed;
    &__content{
      &__wrapper{
        overflow:hidden;
        height: 100vh;
        display: flex;
        flex-direction:column;
        justify-content:space-around;
      }
      &__loader{
        @extend .center_center;
      }
      &__photos, &__slider, &__loader{
        @include transition(opacity 500ms);
         display: flex;
        justify-content:center;
      }
      & .hide{
        opacity : 0;
      }
      &__texte{
        position:fixed;
        text-align:center;
        display: flex;    
        flex-direction: column;
        width: 100%;
      }
      &__title{
        font-weight: 400;
        display: flex;
        justify-content:center;
        margin: 7vh 0 0.4em 0;
        font-size:2.5em;
        text-shadow:#000 2px 2px 8px;
      }
      &__subtitle{
        @extend .gallery__content__title;
        color : #bbbbbb;
        margin: 0;
        font-size: 1.5em;
        font-family: "Montserrat"
      }
      &__center{
        width:500px;
        height: 100vh;
        position: fixed;
        @include transform(translate3d(-50%, 0, 0));
        left : 5%;
        top:0;
        background-color:rgba(255, 0, 0, 0.5);
      }
    }
    &__copyright{
      position : absolute;
      right : 30px;
      bottom: 30px;
      margin:0;
      padding: 0;
      &__label{
        font-family: Montserrat;
        font-size: 1rem;
        font-weight: 600;
        & > span{
          font-size: 0.7rem;
          
        }
      }
    }
  }

  @include tablet{
    .gallery__content{
      font-size: 90%;
      &__wrapper{
        overflow:scroll;
      }
    }
  }
</style>
