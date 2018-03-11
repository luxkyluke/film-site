<template>
  <div class="photo">
    <div class="photo__container">
      <img  :id="idName"
            class="photo__container__shadow " 
            :src="shadow"
            :class="shadowClass"
      />
      <img  :id="idName"
            class="photo__container__img" 
            :src="img"
            :style="myStyle"
            :class="myClass"
            ref="image"
      />
      <img  class="photo__container__area" 
            :src="img"
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
      img : imgPortrait,
      myStyle : null,
      idName : "photo_img_"+this.photo.id,
      clip : null,
      shadow,
      //translate: 'translate(0px)',
      translateY: 0,
      translateX: 0,
      observer: null,
      active : false,
    }
  },
  computed: {
    isEven (){
      return this.photo.id%2 == 0;
    },
    myClass (){
      let c = (this.photo.portrait) ? "portrait" : "";
      c +=(this.isEven) ? " even" : " odd";
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
      else
        x=this.translateX;

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
        if(height > width){ 
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
      if(height>width){// si portrait
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
      const clip = this.getClip(img);
      this.clip = clip;
      this.myStyle = {
        'clip-path':clip,
        '-webkit-clip-path':clip,
        '-webkit-transform': this.translate,
        'transform': this.translate
      }
    },
    showInfo:function(){
      if(this.isBlocked)
        return;
      //setTimeout(() =>{
      this.myStyle = {
        'clip-path':`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        '-webkit-clip-path':`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        '-webkit-transform': 'translate(0px)',
        'transform': 'translate3d(0px)'
      }
      this.active = true;
      //}, 200)
    },
    hideInfo:function(){
      if(this.isBlocked)
        return;
      this.myStyle = {
        'clip-path':this.clip,
        '-webkit-clip-path':this.clip,
        '-webkit-transform': this.translate,
        'transform': this.translate
      }
      this.active = false;
    },
    mouseOver : function(){
      this.showInfo();
      this.$emit("showFullImg", this.photo.id);
    },
    mouseLeave : function(){
      this.hideInfo();
      this.$emit('hideFullImg')
    },
    intersect : function(entries){
      const image = entries[0];
      if (image.isIntersecting && !this.isBlocked) {
        this.$emit("changeCurrentId", this.photo.id);
      } 
    },
    initObserver: function(){
      let observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      };

      this.observer = new IntersectionObserver((entries)=>{
        const image = entries[0];
        if (image.isIntersecting && image.intersectionRatio > 0.9999) {
          this.$emit("changeCurrentId", this.photo.id);
        } 
      }, observerOptions);

      this.observer.observe(this.$el);
    }
  },
  mounted () {
    setTimeout(this.mask, 300);
    this.initObserver();
  },
  destroy(){
    this.observer.disconnect();
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
        position:absolute;

        

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
