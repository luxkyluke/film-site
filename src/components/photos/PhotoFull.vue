<template>
  <div class="photo-full" :class="myClass">
        
    <img class="photo-full__img" :class="photoClass" :src="img" />
    <div class="photo-full__filter" ></div>
    <div class="photo-full__content" ref="content" @click="closeInfo" > 
      <img class="photo-full__content__cross icon" :src="cross" @click="closeFullImg"></img>
      <photo-info
        :photo="photo"
        :isActive = "infoActive"
        :isFull="true"
      ></photo-info>
      <img 
        class="photo-full__content__info icon" 
        :src="info"
        @click="clickInfo"
      ></img>
    </div>
    
  </div>
</template> 

<script>
import imgTest from '@/assets/test.jpg'
import imgPortrait from '@/assets/test2.jpg'
import PhotoInfo from '@/components/photos/PhotoInfo'
import cross from '@/assets/icon/cross.svg'
import info from '@/assets/icon/info.svg'

export default {

  name: 'PhotoFull',
  data () {
    return{
      img :imgPortrait,
      infoActive:false,
      cross, 
      info
    }
  },
  props:{
    photo: Object,
    isVisible: Boolean,
    isActive:Boolean,
    position: String
  },
  components: {
    'photo-info': PhotoInfo,
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
      c += (this.photo.portrait) ? " portrait" : ""
      return c;
    }
  },
  methods:{
    clickInfo:function(e){
      e.stopPropagation();
      this.infoActive = !this.infoActive;
    },
    closeInfo:function(){
      this.infoActive = false
    },
    closeFullImg:function(){
      this.infoActive = false
      this.$emit('closeFullImg')
    }
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
    
    &__content{
      @extend .full;
      position: absolute;
  
      .icon{
        @include transition(transform 300ms ease-in-out)
        width: $iconWidth;
        cursor:pointer;
        margin: 30px;
        position: absolute;
        right: 0;
        @include transform(translateX(150px))
      }
     
      &__info{
        bottom:0;
      }
    }
  
    &.active{
      .photo-full__content{
        @include transition(transform 300ms ease-in-out 500ms)
        .icon{
          @include transform(translateX(0px))
        }
      }
    }

    &.visible{
      @include transition(opacity 500ms ease-in-out)
      opacity:1
    }

    &.active > &__filter{
      opacity:0;
    }

    &__filter{
      @include transition(opacity 500ms ease-in-out)

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
          left:0;
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
