<template>
  <div class="photo-info" :class="myClass" 
      @mouseover="over"
      @mouseleave="leave">
    <h2  class="photo-info__title">{{photo.name}}</h2>
    <ul class="photo-info__list">
      <li class="photo-info__list__item">
        <div class="photo-info__list__item__logo">
          <img class="icon" :src="iconCamera"></img>
        </div>
        <div class="photo-info__list__item__label">{{this.photo.camera}}</div>
      </li>
      <li class="photo-info__list__item">
        <div class="photo-info__list__item__logo">
          <img class="icon" :src="iconFilm"></img>
        </div>
        <div class="photo-info__list__item__label">{{this.photo.film}}</div>
      </li>
      <li class="photo-info__list__item">
        <div class="photo-info__list__item__logo">
          <img class="icon" :src="iconLens"></img>
        </div>
        <div class="photo-info__list__item__label">{{this.photo.lens}}</div>
      </li>
    </ul>
  </div>
</template> 

<script>
import Icon from '@/components/Icon'
import iconCamera from '@/assets/icon/photo.svg'
import iconFilm from '@/assets/icon/film.svg'
import iconLens from '@/assets/icon/lens.svg'

export default {
  name: 'PhotoInfo',
  data () {
    return{
      iconLens,
      iconFilm,
      iconCamera
    }
  },
  components: {
    Icon,
  },
  props:{
    photo: Object,
    myClass: Object,
    isActive: Boolean,
  },
  methods:{
    over: function(e){
      if(this.isActive)
      this.$emit("mouseover", e);
    },
    leave: function(e){
      this.$emit("mouseleave", e);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '~sass/main.scss';
  .photo-info{
    width : 250px;
    height : 250px;
    padding: 40px;
    position:absolute;
    @include transform(translateX(-50%));
    @include transition(opacity 300ms ease-in);
    @include transition(transform 300ms ease-in);
    bottom:0;
    opacity:0;
    text-shadow: black 2px 2px 3px;


    &.even{
      top:5vh;
    }

    &.even.portrait{
      top:0;
    }
    &.portrait{
      bottom: -5vh;
    }

    &.active{
      @include transition(opacity 300ms ease-out 350ms);
      @include transition(all 300ms ease-out 500ms);
      @include transform(translateX(-40%));
      opacity: 1;
    }

    &__title {
      font-weight:700;
      font-size: 2.3em;
      margin-top:0;
    } 
    &__list{
      font-size: 1.25em;
      padding:0;
      &__item{
        list-style:none;
        display:flex;
        justify-content:space-between;
        margin: 10px 0;
      
        &__logo{
          text-align:center;
          width: 30px;
          height: 30px;

          .icon{
            height:100%;
            width:auto;
          }
        }
        &__label{
          text-align:left;
          line-height: 30px;
          width: 75%;
          font-size: 1.3em;
        }

      }
    }

  }
</style>
