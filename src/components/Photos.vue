<template>
  <div 
    class="photos"
    @scroll="handleScroll"
    :style="myStyle"
  >
    <photo
        v-for= "p in photos"
        :ref="'photo_'+p.id"
        :key= "p.id"
        :photo="p"
        :isCurrent= "p.id === currentId"
        :isBlocked="isBlocked || disablePhotoOnScroll"
        :displayInfo="p.id === idShowInfo"
        :blursAreLoaded="blursAreLoaded"
        @observe = "observe"
        @changeCurrentId = "changeId"
        @showFullImg="showFullImg"
        @hideFullImg="hideFullImg"
        @click="openImg"
        @imgLoaded = "imgLoaded"
      ></photo>
  </div>
</template>

<script>
import Photo from '@/components/photos/Photo'
import Utility from '@/addons/utility'

export default {
  name: 'Photos',
  props: {
    photos: Array,
    isBlocked:Boolean,
    showInfo:Boolean,
    currentId: {
      type: Number
    }
  },
  data (){
    return {
      photoWidth:0,
      width:0,
      id : 0,
      currentRatio:0,
      offset:0,
      sentBlocked: false,
      disablePhotoOnScroll: false,
      nbLoadedImg : 0,
      observer:null,
      isMounted:false,
      blursAreLoaded: false,
      scrollOffset:0,
      prevPrevPhoto:null,
      prevPhoto:null,
      nextPhoto:null,
      nextNextPhoto:null,
    }
  },
  components: {
    'photo': Photo,
  },
  computed:{
    idShowInfo(){
      return (this.showInfo) ? this.id : -1;
    },
    scrollArea(){
      return this.photoWidth*this.photos.length - window.innerWidth + this.padding*2;
    },
    padding(){
      return (!Utility.isTablet()) ? window.innerWidth*0.3333333 : window.innerWidth*0.15
    },
    myStyle (){
      let s ={  
        '-webkit-transform': `translate3d(-${this.offset}px, 0, 0)`,
        'transform' : `translate3d(-${this.offset}px, 0, 0)`,
      }
      return s
    },
    
  },
  methods:{
    getObserver(){
      const margin = Math.max(window.innerWidth*0.5-this.photoWidth*0.9, 0)
      let observerOptions = {
        root: null,
        rootMargin: `0px -${margin}px`,
        threshold: [1.]
      };
      return new IntersectionObserver(this.intersection, observerOptions);
    },
    observe:function (el){
      if(!this.observer){
        this.observer = this.getObserver();
      }
      this.observer.observe(el);
    },
    intersection:function(entries){
      const image = entries[0];
      const id = Number(image.target.id.replace("photo_", ""))
      if(image.intersectionRatio < 0.9999)
        return;
      this.changeId(id);
    },
    showFullImg:function(id){
      if(this.isBlocked)
        return;
      this.$emit('showFullImg', id)
      this.prevPrevPhoto   = document.getElementById('photo_'+(id-2));
      this.prevPhoto       = document.getElementById('photo_'+(id-1));
      const currentPhoto   = document.getElementById('photo_'+(id));
      this.nextPhoto       = document.getElementById('photo_'+(id+1));
      this.nextNextPhoto   = document.getElementById('photo_'+(id+2));

      if(this.prevPrevPhoto)   TweenMax.to(this.prevPrevPhoto, 0.3, {x:'-75', ease:Quint.easeOut});  
      if(this.prevPhoto)       TweenMax.to(this.prevPhoto, 0.3, {x:'-75', ease:Quint.easeOut});  
      if(currentPhoto)       TweenMax.to(currentPhoto, 0.3, {x:'0', ease:Quint.easeOut});  
      if(this.nextPhoto)       TweenMax.to(this.nextPhoto, 0.3, {x:'75', ease:Quint.easeOut});  
      if(this.nextNextPhoto)   TweenMax.to(this.nextNextPhoto, 0.3, {x:'75', ease:Quint.easeOut});  
    },
    hideFullImg:function(){
      this.$emit('hideFullImg')
      if(this.prevPrevPhoto)   TweenMax.to(this.prevPrevPhoto, 0.3, {x:'0', ease:Quint.easeIn});  
      if(this.prevPhoto)       TweenMax.to(this.prevPhoto, 0.3, {x:'0', ease:Quint.easeIn});  
      if(this.nextPhoto)       TweenMax.to(this.nextPhoto, 0.3, {x:'0', ease:Quint.easeIn});  
      if(this.nextNextPhoto)   TweenMax.to(this.nextNextPhoto, 0.3, {x:'0', ease:Quint.easeIn});  
    },
    openImg:function(id){
      if(this.isBlocked)
        return;
      this.$emit('openFullImg', id)
    },
    scrollToCurrentPhoto () {
      const offsetCurrentPhoto = this.padding + this.currentId*this.photoWidth
      const offsetMiddle = window.innerWidth*0.5 - this.photoWidth*0.5
      const scrollElem = document.getElementById('scrollablePhotos')
      const offset =  (!Utility.isTablet()) ? this.offset : scrollElem.scrollLeft;

      let delta = offset - offsetCurrentPhoto
      const nextVal = offset - delta - offsetMiddle

      if(Utility.isTablet()){
        TweenMax.to(scrollElem, 1, {scrollLeft:Math.abs(Math.max(nextVal, 0)), ease:Quint.easeOut, 
          onStart:this.disableChangeId, onComplete:this.enableChangeId});  
        return;
      }
      TweenMax.to(this, 1, {offset:nextVal, ease:Quint.easeOut, 
          onStart:this.disableChangeId, onComplete:this.enableChangeId});  
    },
    disableChangeId:function(){
      this.sentBlocked = true;
    },
    enableChangeId:function(){
      this.sentBlocked = false;
    },
    changeId:function(id){
      if(!this.sentBlocked){
        this.id = id;
        this.$emit('changeCurrentId', id)
      }
    },
    handleScroll: function(e){
      if(this.isBlocked)
        return;
      if(this.showInfo)
        this.$emit('hideFullImg')


      let delta = e.deltaY
      if(Utility.isFirefox())
        delta *= 20
      this.offset = Utility.clamp(this.offset+delta, 0, this.scrollArea)
      if(!this.disablePhotoOnScroll)
        this.disablePhotoOnScroll = true;
    },
    handleMouseMove:function (){
      if(this.disablePhotoOnScroll)
        this.disablePhotoOnScroll = false;
    },
    getWidths: function(){
      this.width =  this.$el.clientWidth
      this.photoWidth = this.$el.querySelector('.photo').clientWidth
      if(this.isMounted && this.observer){
        this.observer.disconnect();
        this.observer = null;
      }
    },
    imgLoaded:function(id){
      this.nbLoadedImg +=1;
      const minLoaded = this.photos.length-1;
      if(this.nbLoadedImg > minLoaded){
        this.$emit('photosLoaded')
        this.blursAreLoaded = true;
      }
    },
    handleResize(){
      this.getWidths()
      if(!Utility.tablet)
        document.getElementById('scrollablePhotos').scrollLeft = 0
      else{
        this.offset = 0
      }
    }
  },
  created () {
    window.addEventListener('wheel', this.handleScroll);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
  },
  mounted(){
    this.getWidths();
    this.isMounted = true;
    //this.initObserver();
  },
  destroyed () {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    this.observer.disconnect();
  },
  watch: {
    currentId: function(newId){
      if(this.id != newId){
        this.scrollToCurrentPhoto()
        this.id = newId 
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~sass/main.scss';
  .photos{
    margin-top:5vh;
    height:55vh;
    white-space: nowrap;
    padding: 0 33.33% ;
    display: block;
  }

 @include tablet{
    .photos{
      padding: 0 15%;
    }
  }

  @include mobile{
    .photos{
      margin: 0;
      padding: 0 10%;
    }
  }
</style>
