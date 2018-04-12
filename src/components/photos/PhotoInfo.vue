<template>
  <div class="photo-info" :class="myClass">
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
      <li v-if="photo.location && photo.locationLink"class="photo-info__list__item">
        <div class="photo-info__list__item__logo">
          <img class="icon" :src="iconLocation"></img>
        </div>
        <div class="photo-info__list__item__label"><a target="_blank" :href="photo.locationLink">{{this.photo.location}}</a></div>
      </li> 
      <li v-if="isFull" class="photo-info__list__item">
        <div class="photo-info__list__item__logo">
          <img class="icon" :src="iconCopy"></img>
        </div>
        <div class="photo-info__list__item__label"><a target="_blank" href="http://antoinedemiere.com/#/about">Antoine Demière</a></div>
      </li>
    </ul>
  </div>
</template> 

<script>
import iconCamera from '@/assets/icon/photo.svg'
import iconFilm from '@/assets/icon/film.svg'
import iconLens from '@/assets/icon/lens.svg'
import iconLocation from '@/assets/icon/location.svg'
import iconCopy from '@/assets/icon/copyright.svg'

export default {
  name: 'PhotoInfo',
  data () {
    return{
      iconLens,
      iconFilm,
      iconCamera,
      iconCopy,
      iconLocation
    }
  },
  props:{
    photo: Object,
    photoClass: Object,
    isActive: Boolean,
    isFull:Boolean
  },
  computed:{
    myClass(){
      let c = (!this.isFull) ? this.photoClass : "full"
      c += (this.isActive) ? " active" : "";
      return c;
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
    @include transform(translate3d(-60%, 0, 0));
    @include transition(all 300ms ease-in-out);
    bottom:0;
    opacity:0;
    text-shadow: $bodyBG 2px 2px 3px;

    &.full{
      width : 300px;
      height : 300px;
      background-color:rgba(0, 0, 0, 0.75);
      bottom: 0;
      right: 0;
      margin: 15px;
      @include transform(translate3d(60%, 0, 0));
      @include transition(all 200ms ease-in-out);

      &.active{
        @include transform(translate3d(0%, 0, 0));
      }

      .photo-info__list li:last-child{
        margin-top: 20px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.83em;
        font-family:"Montserrat";
        position: absolute;
        width: 70%;
        bottom: 20px;
      }
  
    }



    &.even{
      top:4vh;
    }

    &.even.portrait{
      top:0;
    }
    &.portrait{
      bottom: -5vh;
    }

    &.active{
      @include transition(all 250ms ease-out 400ms);
      @include transform(translate3d(-40%, 0, 0));
      opacity: 1;
    }

    &__title {
      font-weight:700;
      font-size: 2.2em;
      margin-top:0;
    } 
    &__list{
      font-size: 1.25em;
      font-weight:400;

      padding:0;

      

      &__item{
        list-style:none;
        display:flex;
        justify-content:space-between;
        margin: 14px 0;
      
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
          font-size: 1.2em;
        }

      }
    }

  }
</style>
