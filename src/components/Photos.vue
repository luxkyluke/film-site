<template>
  <div 
    class="photos"
    @scroll="handleScroll"
    :style="myStyle"
  >
    <photo
        v-for= "p in photos"
        v-bind:key= "p.id"
        :photo="p"
        :isCurrent= "p.id === currentId"
        :isBlocked="isBlocked || disablePhotoOnScroll"
        :displayInfo="p.id === idShowInfo"
        @observe = "observe"
        @changeCurrentId = "changeId"
        @showFullImg="showFullImg"
        @hideFullImg="hideFullImg"
        @click="openImg"
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
    }
  },
  components: {
    'photo': Photo,
  },
  computed:{
    // observer(){
    //   return new IntersectionObserver((e)=>{})
    // },
    idShowInfo(){
      return (this.showInfo) ? this.id : -1;
    },
    scrollArea(){
      return this.width - window.innerWidth;
    },
    padding(){
      return (this.width-this.photoWidth*this.photos.length)*0.5
    },
    myStyle (){
      let s ={  
        '-webkit-transform': `translate3d(-${this.offset}px, -50%, 0)`,
        'transform' : `translate3d(-${this.offset}px, -50%, 0)`,
      }
      return s
    },
    observer(){
      let observerOptions = {
        root: null,
        rootMargin: `0px -${window.innerWidth*0.5-400}px`,
        threshold: [1.0]
      };

      return new IntersectionObserver(this.intersection, observerOptions);
    },
  },
  methods:{
    observe:function (el){
      this.observer.observe(el);
    },
    intersection:function(entries){
      const image = entries[0];
      const id = Number(image.target.id.replace("photo_", ""))
      if(image.intersectionRatio < 0.99)
        return;
      this.changeId(id);
    },
    showFullImg:function(id){
      this.$emit('showFullImg', id)
    },
    hideFullImg:function(){
      this.$emit('hideFullImg')
    },
    openImg:function(id){
      this.$emit('openFullImg', id)
    },
    scrollToCurrentPhoto () {
      const offsetCurrentPhoto = this.padding + this.currentId*this.photoWidth
      const delta = this.offset - offsetCurrentPhoto
      const offsetMiddle = window.innerWidth*0.5 - this.photoWidth*0.5

      const nextVal = this.offset - delta - offsetMiddle
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
      //this.sentBlocked = true;
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
    initWidth: function(){
      this.width =  this.$el.clientWidth
      this.photoWidth = this.$el.querySelector('.photo').clientWidth
    }
  },
  created () {
    window.addEventListener('wheel', this.handleScroll);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.initWidth);
  },
  mounted(){
    this.initWidth();
    //this.initObserver();
  },
  destroyed () {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('resize', this.initWidth);
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
    height:50vh;
    white-space: nowrap;
    top: 50%;
    position: absolute;
    padding: 0 33.33%;
  }

</style>
