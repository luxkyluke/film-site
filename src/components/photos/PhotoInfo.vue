<template>
  <div class="photo-info">
    <h2>{{photo.name}}</h2>
    <ul class="photo-info__list">
      <li class="photo-info__list__camera">
        <span class="photo-info__list__logo"></span>
        <span class="photo-info__list__label"></span>
      </li>
      <li class="photo-info__list__film"></li>
      <li class="photo-info__list__lens"></li>
    </ul>
  </div>
</template>

<script>
import iconPhoto from '@/assets/icon/photo.svg'
import iconFilm from '@/assets/icon/film.svg'
import iconLens from '@/assets/icon/lens.svg'

export default {
  name: 'PhotoInfo',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Asqqdzapp'
    }
  },
  props:{
    photo: Object
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
