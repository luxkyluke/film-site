<template>
  <div class="photo" :id="'photo_'+photo.id">
    <div class="photo__container">
      <img  :id="idName"
            class="photo__container__shadow " 
            :src="shadow"
            :class="shadowClass"
      />
      <img  :id="idName"
            class="photo__container__img" 
            v-lazy="photo.src"
            lazy="loading"
            :style="myStyle"
            :class="myClass"
            ref="image"
      />
      <img  class="photo__container__area" 
            :src="photo.src"
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
      ></photo-info>
    </div>
  </div>
</template>

<script>
import imgTest from '@/assets/test.jpg'
import imgPortrait from '@/assets/test2.jpg'
import shadow from '@/assets/shadow.png'
import PhotoInfo from './PhotoInfo'

export default {
  name: 'Photo',
  props: {
    photo: Object,
    isBlocked:Boolean,
    displayInfo:Boolean,
    observer: Object,
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'photo-info': PhotoInfo,
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
      //observer: null,
      active : false,
      activeDuringBlock : false,
    }
  },
  computed: {
    isEven (){
      return this.photo.id%2 == 0;
    },
    myClass (){
      let c = (this.photo.portrait) ? "portrait" : "";
      c +=(this.isEven) ? " even" : " odd";
      c +=(this.isBlocked) ? " blocked" : "";
      return c;
    },
    classInfo(){
      return (this.active) ? this.myClass + " active" : this.myClass
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
        this.showInfo()
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
    click: function(){
      if(!this.isBlocked)
        this.$emit('click', this.photo.id)
    },
    getClip: function(img){
      const width = img.clientWidth;
      const height = img.clientHeight;
      const position = this.photo.mask;
      let w = width;
      let h = height;

      if(position === "begin"){
         //si c'est un portrait on inverse
        if(this.photo.portrait){ 
          w = height;
          h = width;
          this.translateY = height-width;
        }else{
          this.translateX = (w-h)*0.5;
        }
        const tmp = `polygon(0px 0px, ${h}px 0px, ${h}px ${h}px, 0px ${h}px)`;
        return tmp;
      }

      w = width;
      h = height;
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
      this.$emit("showFullImg", this.photo.id);
    },
    mouseLeave : function(){
      if(this.isBlocked){
        this.activeDuringBlock = false;
      }
      this.hideInfo();
      this.$emit('hideFullImg')
    },
    initObserver: function(){
      this.$emit('observe', this.$el);
    },
    handleLoaded: function({ el, src }) {
      if(this.mask()){
        this.$Lazyload.$off('loading', this.handleLoaded)
        this.$emit('imgLoaded', this.photo.id)
      }
    },
    handleResize:function(){
      this.mask();
      this.initObserver();
    }
  },
  mounted () {
    this.$Lazyload.$on('loading', this.handleLoaded)
    window.addEventListener('resize', this.handleResize)    
    this.initObserver();
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
    &__container{
      @extend .full;
         display: flex;
        justify-content: center;
     
      
      &__shadow{
        @extend .photo__container__img;
        box-shadow: rgba(0, 0, 0, 0.6) 40px 40px 120px ;
        @include transition(opacity 350ms ease-in-out);
        opacity: 1;
        &.hide{
          opacity:0;
        }
      }

      &__img{
        @include transition(all 350ms ease-in-out);
        height:25vh;
        width:auto;
        cursor: pointer;
        &.blocked{
          cursor:inherit;
        }
        position:absolute;

        &[lazy=loading]{
          @include blur(5px);
        }

        &.portrait{
          width:25vh;
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
</style>
