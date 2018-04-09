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
    currentId: Number
  },
  data () {
    return {
      interId : this.currentId
    }
  },
  components: {
    'slider-square': SliderSquare
  },
  computed: {
    id : function(){
      return this.interId
    },

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
    changeCurrentId: function(newId) {
      const oldId = this.id;
      let testIterId = {id:this.id}
      TweenLite.to(testIterId, .7, {
        id:newId, 
        onUpdate:(tween, id)=>{
          this.interId = tween.target[id]
        },  
        onUpdateParams:["{self}", 'id'],
        ease:Quint.easeOut, 
        roundProps:"id"
      });  

      this.$emit("changeId", newId);
    }
  },
  watch:{
    currentId: function(newId){
      if(this.id !== newId)
        this.interId = newId
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
