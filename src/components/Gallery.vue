
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
      <h1 class="gallery__content__title" :class="myClass">{{ title }}</h1>
      <!-- <div id="middle-area" class="middle"></div> -->
     
      <photos
        v-bind:photos ="photos"
        v-bind:currentId = "idPhoto"
        v-on:changeCurrentId ="changeCurrentPhoto"
        :isBocked = "fullImgActivated"
        :showInfo = "showInfo"
        @showFullImg="showFullImg"
        @hideFullImg="hideFullImg"
        @openFullImg="openFullImg"
        
      ></photos>
      <slider
        v-bind:photos ="photos"
        v-bind:currentId = "idPhoto"
        v-on:changeId = "changeCurrentPhoto"
      ></slider>
    </div>
  </div>
</template>

<script>
import Photos from '@/components/Photos'
import Slider from '@/components/Slider'
import PhotoFull from '@/components/photos/PhotoFull'
import PhotoApi from '@/api/PhotoApi.js'
import Utility from '@/addons/utility.js'

export default {
  name: 'Gallery',
  data () {
    return {
      photos: PhotoApi.all(),
      title: 'Film Photography',
      idPhoto : 0,
      fullImgVisible:false,
      showInfo:false,
      idFullImg : 0,
      fullImgActivated:false
    }
  },
  computed:{
    currentImg(){
      return this.photos[this.idFullImg]
    },
    myClass(){
      return (this.fullImgActivated) ? "hide" : ""
    }
  },
  components: {
    'photos': Photos,
    'slider': Slider,
    'photo-full':PhotoFull,
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
    @extend .full;
    &__content{
      
      // &>.middle{
      //   width: 400px;
      //   position: absolute;
      //   height: 100vh;
      //   top:0;
      //   transform: translateX(-50%);
      //   left: 50%;
      //   background-color: red;
      //   z-index:6;
      //   //display: none;
      // }
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
  }
</style>
