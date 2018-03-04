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
        @changeCurrentId = "changeCurrentId"
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
    currentId: {
      type: Number,
      default: 0
    }
  },
  data (){
    return {
      photoWidth:0,
      width:0,
      offset:0
    }
  },
  components: {
    'photo': Photo,
  },
  computed:{
    scrollArea(){
      return this.width - window.innerWidth;
    },
    padding(){
      return (this.width-this.photoWidth*this.photos.length)*0.5
    },
    
    myStyle (){
      let s ={  
        'transform' : `translate(-${this.offset}px, -50%)`,
      }
      return s
    }
  },
  watch: {
    currentId: function(newId, oldId){
      if(this.currentId != newId)
        this.scrollToCurrentPhoto()
    }
  },
  methods:{
    scrollToCurrentPhoto () {
      const offsetCurrentPhoto = this.padding + this.currentId*this.photoWidth
      const delta = this.offset - offsetCurrentPhoto
      const offsetMiddle = window.innerWidth*0.5-this.photoWidth*0.5

      this.offset = this.offset - delta - offsetMiddle
    },
    changeCurrentId:function(id){
      this.currentId = id;
      this.$emit('changeCurrentId', id)
    },
    handleScroll: function(e){
      let delta = e.deltaY
      if(Utility.isFirefox())
        delta *= 20
      this.offset = Utility.clamp(this.offset+delta, 0, this.scrollArea)
    },
    initWidth: function(){
      this.width =  this.$el.clientWidth ;
      this.photoWidth = this.$el.querySelector('.photo').clientWidth;
    }
  },
  created () {
    window.addEventListener('wheel', this.handleScroll);
    window.addEventListener('resize', this.initWidth);
  },
  mounted(){
      this.initWidth();
  },
  destroyed () {
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('resize', this.initWidth);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .photos{
    height:50vh;
    white-space: nowrap;
    top: 50%;
    position: absolute;
    padding: 0 33.33%;
  }

</style>
