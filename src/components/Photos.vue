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
        :changeCurrentId = "changeCurrentId"
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
    },
    changeCurrentId : Function
  },
  data (){
    return {
      offset:0,
      width:null,
      idPhoto:0
    }
  },
  components: {
    'photo': Photo,
  },
  computed:{
    myStyle (){
      let s ={
        'transform' : `translate(-${this.offset}px, -50%)`,
      }
      return s
    }
  },
  methods:{
    handleScroll: function(e){
      let delta = e.deltaY
      if(Utility.isFirefox())
        delta *= 20
      this.offset = Utility.clamp(this.offset+delta, 0, this.width)
    },
    initWidth: function(){
      this.width =  this.$el.clientWidth  - window.innerWidth;
      console.log(this.width)
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
