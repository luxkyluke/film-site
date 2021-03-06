<template>
  <div class="photo" :id="'photo_'+photo.id">
    <div class="photo__container">
      <img  class="photo__container__shadow " 
            :src="shadow"
            :class="shadowClass"
      />
      <img  
            :id="idName"
            class="photo__container__img" 
            :src="imgSrc"
            :style="myStyle"
            :class="myClass"
            @load="handleLoadedImg"
      />
      <img  class="photo__container__blur" 
            :src="getBlur"
            :style="myStyle"
            :class="blurClass"
            @load="handleLoadedBlur"
            ref="image"
      />
      <img  class="photo__container__area" 
            :src="imgSrc"
            :style="myStyle"
            :class="myClass"
            @mouseover="mouseOver"
            @mouseleave="mouseLeave"
            @click="click"
      />
      <photo-info
        :photo="photo"
        :class="classInfo"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        :isActive = "active"
        :isFull="false"
      ></photo-info><!-- 
      <photo-like
        :nb="photo.nbLike"
        @increaseLike="increaseLike"
        @decreaseLike="decreaseLike"
      ></photo-like> -->
    </div>
  </div>
</template>

<script>
import Utility from '@/addons/utility'
import shadow from '@/assets/shadow.png'
import PhotoInfo from './PhotoInfo'
import PhotoLike from './PhotoLike'

export default {
  name: 'Photo',
  props: {
    photo: Object,
    isBlocked:Boolean,
    blursAreLoaded:Boolean,
    displayInfo:Boolean,
    observer: Object,
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'photo-info': PhotoInfo,
    'photo-like': PhotoLike,
  },
  data (){
    return {
      myStyle : null,
      idName : "photo_img_"+this.photo.id,
      clip : null,
      shadow,
      isMasked:false,
      translateY: 0,
      translateX: 0,
      translateValue : 0,
      hideBlur : false,
      resetOffset: 0,
      width:0, 
      height:0,
      //observer: null,
      active : false,
      activeDuringBlock : false,
    }
  },
  computed: {
    isEven (){
      return this.photo.id%2 == 0;
    },
    getBlur(){
      return Utility.getBlur(this.photo.src);
    },
    myClass (){
      const imgRatio = this.height/this.width
      const windowRatio = window.innerHeight/window.innerWidth
      let c = (this.photo.portrait) ? "portrait" : "";
      c +=(this.isEven) ? " even" : " odd";
      c +=(this.isBlocked) ? " blocked" : "";
      return c;
    },
    blurClass(){
      return (this.hideBlur) ? this.myClass + ' hide' : this.myClass;
    },
    classInfo(){
      return (this.active) ? this.myClass + " active" : this.myClass
    },
    imgSrc(){
      return (this.blursAreLoaded) ? this.photo.src : ''
    },
    translate (){
      let x=0, y=0;
      let value = 0;

      if(this.isEven){//si la photo est en bas
        if(this.photo.mask === "begin" || this.photo.mask === "middle"){
          value = this.translateY;
        }
      }else{//si la photo est en haut
        if(this.photo.mask === "end" || this.photo.mask === "middle")
          value = -this.translateY;
      }

      if(this.photo.portrait)
        y=value;
      else{
        x=this.translateX;
      }

      return `translate3d(${x}px, ${y}px, 0)`;
    },
    shadowClass(){
      return (this.active) ? this.myClass+' hide' : this.myClass;
    }
  },
  watch: {
    displayInfo: function(isDisplay){
      if(isDisplay){
        this.showInfo();
        
      }else{
        this.hideInfo()
      }
    },
    isBlocked:function(isBlocked){
      if(isBlocked && this.active){
        this.mouseLeave();
        return
      }
      if(!isBlocked && this.activeDuringBlock){
        this.mouseOver();
      }
    }
  },
  methods:{
    pushRight:function(){
      this.resetOffset = this.offset
      this.offset += 50;
    },
    pushLeft:function(){
      this.resetOffset = this.offset
      this.offset -= 50;
    },
    resetOffsetPosition:function(){
      this.offset = resetOffset
    },
    increaseLike:function(){
      console.log("like++")
    },
    decreaseLike:function(){
      console.log("like--")
    },

    click: function(){
      if(!this.isBlocked)
        this.$emit('click', this.photo.id)
    },
    getClip: function(img){
      this.width = img.clientWidth;
      this.height = img.clientHeight;
      const position = this.photo.mask;
      let w = this.width;
      let h = this.height;

      if(position === "begin"){
         //si c'est un portrait on inverse
        if(this.photo.portrait){ 
          w = this.height;
          h = this.width;
          this.translateY = this.height-this.width;
        }else{
          this.translateX = (w-h)*0.5;
        }
        const tmp = `polygon(0px 0px, ${h}px 0px, ${h}px ${h}px, 0px ${h}px)`;
        return tmp;
      }

      w = this.width;
      h = this.height;
      if(this.photo.portrait){// si portrait
        let min, max;
        if(position === "middle"){ // si portrait et middle
          min = (h-w)*0.5;
          max = (h+w)*0.5;
        }else {//portait et end
          min = h-w;
          max = h;
        }
        //this.translate = this.transform(`translateY(-${max}px)`)
        this.translateY = min;
        const tmp = `polygon(0px ${min}px, ${w}px ${min}px, ${w}px ${max}px, 0px ${max}px)`
        return tmp;
      }
      else{//SI PAYSAGE
        let min, max;
        if(position === "middle"){ // si paysage et middle
          min = w*0.5-h*0.5;
          max = w*0.5+h*0.5;
        }else{ //si paysage et end
          min = w-h;
          max = w;
          this.translateX = -min*0.5;
        }
        const tmp = `polygon(${min}px 0px, ${max}px 0px, ${max}px ${h}px, ${min}px ${max}px)`;
        return tmp;
      }
    },
    mask :function (){
      const img = this.$refs.image;
      if (img.clientWidth < 10 || img.clientHeight<10)
        return false;
      const clip = this.getClip(img);
      this.clip = clip;
      this.myStyle = {
        'clip-path':clip,
        '-webkit-clip-path':clip,
        '-webkit-transform': this.translate,
        'transform': this.translate
      }
      return true;
    },
    showInfo:function(){
      if(this.isBlocked){
        this.activeDuringBlock = true;
        return;
      }

      this.myStyle = {
        'clip-path':`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        '-webkit-clip-path':`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        '-webkit-transform': 'translate3d(0px)',
        'transform': 'translate3d(0px, 0, 0)'
      }
      // this.translateValue = this.translateX;
      // this.translateX = 0;
      // console.log(this.translateX)
      this.active = true;
      // this.$emit("showFullImg", this.photo.id);
      this.$emit("showFullImg", this.photo.id);
      
    },
    hideInfo:function(){
      //if(this.isBlocked){
        this.activeDuringBlock = false;
      //}
      this.myStyle = {
        'clip-path':this.clip,
        '-webkit-clip-path':this.clip,
        '-webkit-transform': this.translate,
        'transform': this.translate
      }
      // this.translateX = this.translateValue;
      // console.log(this.translateX)
      this.active = false;
    },
    mouseOver : function(){
      if(this.isBlocked){
        this.activeDuringBlock = true;
        return;
      }
      this.showInfo();
    },
    mouseLeave : function(){
      if(this.isBlocked){
        this.activeDuringBlock = false;
      }
      this.$emit('hideFullImg')
      this.hideInfo();
    },
    initObserver: function(){
      this.$emit('observe', this.$el);
    },
    handleLoadedBlur: function() {
      this.mask()
      this.initObserver();
      this.$emit('imgLoaded', this.photo.id)
    },
    handleLoadedImg: function() {
      this.hideBlur = true;
    },
    handleResize:function(){
      setTimeout(()=>{
        this.mask();
        this.initObserver();
      }, 200)
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  destroy(){
    window.removeEventListener('resize', this.handleResize)    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~sass/main.scss';
  
  .photo{
    width:500px;
    height:100%;  
    display:inline-block;
    @include transition(all 350ms ease-in-out);
    // padding: 5vh 0;
    &__container{
      @extend .full;
        display: flex;
        justify-content: center;
     
      &__shadow{
        @extend .photo__container__img;
        box-shadow: rgba(0, 0, 0, 0.7) 30px 30px 120px ;
        @include transition(opacity 350ms ease-in-out);
        opacity: 1;
        &.hide{
          opacity:0;
        }
      }

      &__blur{
        @extend .photo__container__img;
        @include blur(5px);
        &.hide{
          opacity:0;
        }
      }

      &__img{
        @include transition(all 350ms ease-in-out);
        height:25vmax;
        max-height: 290px;
        width:auto;
        cursor: pointer;
        &.blocked{
          cursor:inherit;
        }
        position:absolute;

        &.portrait{
          width:25vmax;
          max-height: inherit;
          max-width: 290px;
          height: auto;
        }

        &.even{
          align-self:flex-end;
        }
      }

      &__area{
        @extend .photo__container__img;
        z-index:2;
        opacity:0;
      }
    }
  }

  @media (max-width: $mq-tablet), (max-height: $mq-tablet-portrait) {
    .photo{
      width:60vmin;
    }
  }

  
    // @media (max-width: $mq-mobile), (max-height: $mq-mobile-portrait) {
  //   .photo{
  //     width: 60vmin;
  //   }
  // }
</style>
