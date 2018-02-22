<template>
  <div class="photo">
    <div class="photo__container">
      <img  :id="idName"
            class="photo__container__img" 
            :src="img"
            :style="myStyle"
            :class="myClass"
            @mouseover="mouseOver"
            @mouseleave="mouseLeave"
      >
      </img>  
    </div>
  </div>
</template>

<script>
import imgTest from '@/assets/test.jpg'
import imgPortrait from '@/assets/test2.jpg'
export default {
  name: 'Photo',
  props: {
    photo: Object,
    isCurrent: {
      type: Boolean,
      default: false
    }
  },
  data (){
    return {
      img : imgTest,
      myStyle : null,
      idName : "photo_img_"+this.photo.id,
      clip : null,
      //translate: 'translate(0px)',
      translateY: 0,
      translateX: 0
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
    }
  },

  methods:{
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
      const img = this.$el.querySelector("#"+this.idName);
      const clip = this.getClip(img);
      this.clip = clip;
      this.myStyle = {
        'clip-path':clip,
        '-webkit-clip-path':clip,
        '-webkit-transform': this.translate,
        'transform': this.translate
      }
    },
    mouseOver : function(){
      this.myStyle = {
        'clip-path':`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        '-webkit-clip-path':`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        '-webkit-transform': 'translate(0px)',
        'transform': 'translate3d(0px)'
      }
    },
    mouseLeave : function(){
      this.myStyle = {
        'clip-path':this.clip,
        '-webkit-clip-path':this.clip,
        '-webkit-transform': this.translate,
        'transform': this.translate
      }
    },
    
  },
  mounted () {
    setTimeout(this.mask, 100);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '~sass/main.scss';
  
  .photo{
      width:40%;
      height:100%;  
      display:inline-block;

    &__container{
      @extend .full;
      display: flex;
      justify-content: center;

      &__img{
        @include transition(all 350ms ease-in-out);
        height:25vh;
        width:auto;
        position:absolute;
        
        &.portrait{
          width:25vh;
          height: auto;
        }

        &.even{
          align-self:flex-end;
        }
      }
    }
  }
</style>
