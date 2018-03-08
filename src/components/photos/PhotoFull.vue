<template>
  <div class="photo-full" :class="myClass">
    <img class="photo-full__img" :class="photoClass" :src="img"/>
    <div class="photo-full__filter"></div>
  </div>
</template> 

<script>
import imgTest from '@/assets/test.jpg'
import imgPortrait from '@/assets/test2.jpg'

export default {

  name: 'PhotoFull',
  data () {
    return{
      img :imgTest
    }
  },
  props:{
    src: String,
    isVisible: Boolean,
    isActive:Boolean,
    isPortrait: Boolean,
    position: String
  },
  computed:{
    myClass (){
      let c = "";
      c+= (this.isActive ) ? " active" : ""
      c+= (this.isVisible ) ? " visible" : ""
      return c;
    },
    photoClass(){
      let c = this.position
      c += (this.isPortrait) ? " portrait" : ""
      return c;
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '~sass/main.scss';
  .photo-full{
    @extend .full;
    position:fixed;
    top:0;
    z-index: -1;
    opacity:0;
    @include transition(opacity 300ms ease-in-out)
    
    &.visible{
      @include transition(opacity 500ms ease-in-out)
      opacity:1
    }

    // &.visible > &__filter{
    //   @include transition(opacity 500ms ease-in-out)
    //   opacity:1
    // }

    &__filter{
      //@include transition(opacity 300ms ease-in-out 50ms)

      opacity:1;
      @extend .full;
      position: fixed;
      top:0;
      background-image: radial-gradient(circle at 50% -10%, rgba(37, 37, 37, 0.3) 0%, rgba(37, 37, 37, 0.7) 65%, $bodyBG 80%)
    }

    &__img{
      width: auto;
      height: 100%;
      position: absolute;
      &.portrait{
        width: 100%;
        height: auto;
        &.middle{
          @include transform(translateY(-50%));
          top:50%;
        }
        &.end{
          bottom:0%;
        }
      }
      &.middle{
        @include transform(translateX(-50%));
        left:50%;
      }
      &.end{
        right:0;
      }
    }
  }
</style>
