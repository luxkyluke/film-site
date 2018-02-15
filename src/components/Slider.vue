<template>
  <div class="slider">
    <div class="slider__list">
      <slider-square
          v-for="p in sizedPhotos"
        v-bind:id="p.id"
        v-bind:key="p.id"
        :size = "p.size"
        v-on:changeId = "changeCurrentId"
      ></slider-square>
    </div>
  </div>
</template>

<script>
import SliderSquare from '@/components/slider/SliderSquare'

export default {
  name: 'Slider',
  props: {
    photos: Array,
    currentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      id : this.currentId,
      defaultSize: 'default-size',
      smallSize: 'small-size',
      bigSize: 'big-size',
      maxSize: 'maxi-size'
    }
  },
  components: {
    'slider-square': SliderSquare
  },
  computed: {
    // ajoute la propriété size à l'objet photo en fonction de l'id current
    sizedPhotos: function () {
      return this.photos.map((p, i) => {
        let size = 'default-size'
        if (i === this.id - 1 || i === this.id + 1) {
          size = 'big-size'
        } else if (i === this.id - 2 || i === this.id + 2) {
          size = 'small-size'
        } else if (i === this.id) {
          size = 'maxi-size'
        }
        p.size = size
        return p
      })
    }
  },
  methods: {    
    changeCurrentId: function(id) {
      if(id === this.id)
        return;
      //interpolation entre les 2 ids 
      const oldId = this.id;
      let delta = id - oldId;
      const coef = delta>0 ? 1 : -1;
      delta = Math.abs(delta);
      const speed = 50-delta*0.4;

      for (let i=0; i<delta; i++){
        setTimeout(() =>{
          this.id += coef;
        }, speed*i);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
  @import "~sass/main";
  .slider{
    @extend .center;
    position: fixed;
    bottom: $generalMargin;

    &__list{
      display: flex;
      align-items: center;
      min-height: 40px;
    }
  }
</style>
