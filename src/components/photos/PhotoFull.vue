<template>
  <div class="photo-full" :class="myClass">
        
    <img 
      class="photo-full__img" 
      :class="photoClass" 
      v-lazy="photo.src"
      lazy="loading"
      ref="img" 
      :style="myStyle"
    />
    
    <div class="photo-full__filter" :style="filterStyle"></div>
    <div class="photo-full__content" ref="content" @click="closeInfo" > 
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
      <img class="photo-full__content__cross icon" :src="cross" @click="closeFullImg"></img>
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
      infoActive:false,
      cross, 
      info,
      mouse:{x:0, y:0},
      width:0,
      height:0,
      isMoving : false,
      filterHide:false
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
    filterStyle(){
      return (this.filterHide) ? {'display':'none'} : {}
    },
    myClass (){
      let c = "";
      c+= (this.isActive ) ? " active" : ""
      c+= (this.isVisible ) ? " visible" : ""
      return c;
    },
    photoClass(){
      let c = this.position
      const ratioImg = (this.height !== 0) ? this.width/this.height : 0;
      const ratioWindow = window.innerWidth / window.innerHeight
      c += (this.photo.portrait && this.height < window.innerHeight || (ratioWindow+0.1) > ratioImg) ? " portrait" : ""
      return c;
    },
    translate(){
      let trans={x:0, y:0};
      
      if(Utility.isTablet()){
        return trans;
      }

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
      let next = {x:0, y:0}
      const relativePointerY = this.mouse.y/window.innerHeight
      const remapY = relativePointerY*140/100 - 0.2
      next.y = Utility.clamp(remapY * (this.height-window.innerHeight), 0, this.height-window.innerHeight)

      const relativePointerX = this.mouse.x/window.innerWidth
      const remapX = relativePointerX*140/100 - 0.2
      next.x = Utility.clamp(remapX * (this.width-window.innerWidth), 0, this.width-window.innerWidth)

      return next;
    },
    myStyle(){
      const trans = {
        x: (this.isMoving) ? this.nextPos.x : this.translate.x,
        y: (this.isMoving) ? this.nextPos.y : this.translate.y
      }

      const style = {
        '-webkit-transform': `translate3d(-${trans.x}px, -${trans.y}px, 0)`,
        'transform': `translate3d(-${trans.x}px, -${trans.y}px, 0)`
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
      this.filterHide = false
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
    },
    handleLoaded : function(){
      const h= this.$refs.img.clientHeight
      const w= this.$refs.img.clientWidth
      if (w < 100|| h < 100)
        return
      this.height = h
      this.width = w
      this.$Lazyload.$off('loading', this.handleLoaded)
    },
    handleResize : function(){
      this.height = this.$refs.img.clientHeight
      this.width =  this.$refs.img.clientWidth
    }
  },
  mounted(){
    this.$Lazyload.$on('loaded', this.handleLoaded)
  },

  watch:{
    photo:function(photo){
      this.$Lazyload.$on('loading', this.handleLoaded)
    },
    isActive:function(isActive){
      if(isActive){
        this.height = this.$refs.img.clientHeight
        this.width =  this.$refs.img.clientWidth
        setTimeout( () => {
          this.filterHide = true
        }, 300)
        if(!Utility.isTablet()){
          window.addEventListener('keyup', this.handleKeyUp);
          window.addEventListener('mousemove', this.handleMouseMove);
        }
        window.addEventListener('resize', this.handleResize);
      }
      else{
        this.mouse={x:0, y:0}
        if(!Utility.isTablet()){
          window.removeEventListener('mousemove', this.handleMouseMove);
          window.removeEventListener('keyup', this.handleKeyUp);
        }
        window.removeEventListener('resize', this.handleResize);
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
      // @extend .full;
      position: fixed;
      
      .photo-info{
        position: fixed;
      }

      .icon{
        @include transition(transform 300ms ease-in-out)
        width: $iconWidth;
        cursor:pointer;
        margin: 30px;
        position: fixed;
        right: 0;
        @include transform(translate3d(150px, 0, 0))
      }
     
      &__info{
        position: fixed;
        bottom:0;
      }
    }
  
    &.active{
      .photo-full__content{
        @include transition(transform 300ms ease-in-out)
        .icon{
          @include transform(translate3d(0px, 0, 0))
        }
      }
    }

    &.visible{
      @include transition(opacity 500ms ease-in-out 150ms)
      opacity:1
    }

    &.active > &__filter{
      opacity:0;
    }

    &__filter{
      @include transition(opacity 500ms ease-in-out);
      opacity:1;
      @extend .full;
      position: fixed;
      top:0;
      background-image: radial-gradient(circle at 50% -10%, rgba(37, 37, 37, 0.3) 0%, rgba(37, 37, 37, 0.7) 65%, $bodyBG 80%);
    }

    &__img{
      width: auto;
      height: 100%;
      position: absolute;
      @include transition(transform 200ms linear)

      &[lazy=loading]{
        @include blur(8px);
      }
  
      &.portrait{
        width: 100%;
        height: auto;
      }
    }
  }


  @include tablet{
    .photo-full{
      overflow:scroll;
    }
  }
</style>
