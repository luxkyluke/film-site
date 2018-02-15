<template>
  <div class="photo">
    <div class="photo__container">
      <img  :id="idName"
            class="photo__container__img" 
            :src="img"
            :style="clipStyle"
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
      clipStyle : null,
      idName : "photo_img_"+this.photo.id,
      clip : null
    }
  },
  computed: {
    uniquename (){
      return `photo_${this.photo.id}`
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
        }
        return `polygon(0px 0px, ${h}px 0px, ${h}px ${h}px, 0px ${h}px)`;
      }

      w = width;
      h = height;

      if(height>width){// si portrait
        let min, max;
        if(position === "middle"){ // si portrait et middle
          min = h*0.5-w*0.5;
          max = h*0.5+w*0.5;
        }else {//portait et end
          min = h-w;
          max = h;
        }
        return `polygon(0px ${min}px, ${w}px ${min}px, ${w}px ${max}px, 0px ${max}px)`;
      }
      else{//SI PAYSAGE
        let min, max;
        if(position === "middle"){ // si paysage et middle
          min = w*0.5-h*0.5;
          max = w*0.5+h*0.5;
        }else{ //si paysage et end
          min = w-h;
          max = w;
        }
        return `polygon(${min}px 0px, ${max}px 0px, ${max}px ${h}px, ${min}px ${max}px)`;
      }
    },
    mask :function (){
      const img = this.$el.querySelector("#"+this.idName);
      const clip = this.getClip(img);
      this.clipStyle = {
        'clip-path':clip,
        '-webkit-clip-path':clip
      }
    },
    mouseOver : function(){
      this.clipStyle = {
        'clip-path':null,
        '-webkit-clip-path':null
      }
    },
    mouseLeave : function(){
      if(!this.clip)
        return this.mask();
      this.clipStyle = {
        'clip-path':this.clip,
        '-webkit-clip-path':this.clip
      }
    }
  },
  mounted () {
    this.mask();
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
      &__img{
        @extend .background_img;
        height:25vh;
        width:auto;

        &.portrait{
          width:25vh;
        }
      }
    }
  }
</style>
