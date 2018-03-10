<template>
  <div class="photo-full" :class="myClass">
        
    <img class="photo-full__img" :class="photoClass" :src="img" ref="img" :style="myStyle"/>
    
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
import Utility from '@/addons/utility.js'
import cross from '@/assets/icon/cross.svg'
import info from '@/assets/icon/info.svg'

export default {

  name: 'PhotoFull',
  data () {
    return{
      img :imgTest,
      infoActive:false,
      cross, 
      info,
      mouse:{x:0, y:0},
      width:0,
      height:0,
      isMoving : false,
    }
  },
  props:{
    photo: Object,
    isVisible: Boolean,
    isActive:Boolean,
    position: String,
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
    },
    translate(){
      let trans={x:0, y:0};
      
      if(this.photo.mask === "begin")
        return trans;

      if(this.photo.portrait){
        if(this.photo.mask === "middle")
          trans.y = (this.height*0.5-window.innerHeight*0.5)
        else
          trans.y = (this.height-window.innerHeight)
        return trans
      }

      if(this.photo.mask === "middle")
        trans.x = (this.width*0.5-window.innerWidth*0.5)
      else
        trans.x = (this.width-window.innerWidth)
      return trans;
    },
    nextPos(){
      const margin = 200;
      let next = {x:0, y:0}
      if(this.photo.portrait){
        const relativePointer = this.mouse.y/window.innerHeight
        const remap = relativePointer*140/100 - 0.2
        next.y = Utility.clamp(remap * (this.height-window.innerHeight), 0, this.height-window.innerHeight)
        return next;
      }

      const relativePointer = this.mouse.x/window.innerWidth
      const remap = relativePointer*140/100 - 0.2
      next.x = Utility.clamp(remap * (this.width-window.innerWidth), 0, this.width-window.innerWidth)
      return next;
    },
    myStyle(){
      const trans = {
        x: (this.isMoving) ? this.nextPos.x : this.translate.x,
        y: (this.isMoving) ? this.nextPos.y : this.translate.y
      }

      const style = {
        'transform': `translate(-${trans.x}px, -${trans.y}px)`
      }

      return style
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
      this.isMoving = false
      this.$emit('closeFullImg')
    },
    handleKeyUp:function(e){
      if(e.keyCode == 27) { // escape key maps to keycode `27`
        this.closeFullImg();
      }
    },
    handleMouseMove:function(e){
      this.isMoving = true 
      this.mouse = {
        x : e.clientX,
        y : e.clientY,
      }
    }
  },
  mounted(){
    this.height = this.$refs.img.clientHeight
    this.width =  this.$refs.img.clientWidth
  },
  watch:{
    isVisible:function(isVisible){
      if(isVisible){
        this.height = this.$refs.img.clientHeight
        this.width = this.$refs.img.clientWidth
      }
    },
    isActive:function(isActive){
      if(isActive){
        this.height = this.$refs.img.clientHeight
        this.width = this.$refs.img.clientWidth
        console.log("active")
        window.addEventListener('keyup', this.handleKeyUp);
        window.addEventListener('mousemove', this.handleMouseMove);
      }
      else{
        console.log("desactive")
        this.mouse={x:0, y:0}
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('keyup', this.handleKeyUp);
      }
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
      @include transition(transform 100ms linear)

      &.portrait{
        width: 100%;
        height: auto;
      }
      //   &.middle{
      //     @include transform(translateY(-50%));
      //     top:50%;
      //     left:0;
      //   }
      //   &.end{
      //     bottom:0%;
      //   }
      // }
      // &.middle{
      //   @include transform(translateX(-50%));
      //   left:50%;
      // }
      // &.end{
      //   right:0;
      // }
    }
  }
</style>
