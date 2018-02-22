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
      offset:0,
      width:0,
      photoWidth:0
    }
  },
  components: {
    'photo': Photo,
  },
  computed:{
    myStyle (){
      return {
        'transform' : `translate(-${this.offset}px, -50%)`,
        //'width' : `${this.photoWidth}px`
      }
    }
  },
  methods:{
    handleScroll: function(e){
      this.offset = Utility.clamp(this.offset+e.deltaY, 0, this.width)
    }
  },
  created () {
    window.addEventListener('wheel', this.handleScroll);
  },
  mounted(){
    // setTimeout(() =>{
      const windowWidth = this.$el.clientWidth;
      console.log(this.$el.querySelector('.photo').clientWidth)
      this.photoWidth =  this.$el.querySelector('.photo').clientWidth*this.photos.length;

      const paddings = windowWidth*0.4*2;//les deux paddding autour des photos
      this.width = this.photoWidth*this.photos.length + paddings - windowWidth;
      console.log(this.$el.clientWidth)
      console.log(this.width)
    //}, 0)
  },
  destroyed () {
    window.removeEventListener('wheel', this.handleScroll);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .photos{
    height:50vh;
    white-space: nowrap;
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
    width: 100%;
    padding: 0 40%
  }

</style>
