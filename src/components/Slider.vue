<template>
  <div class="slider">
    <ul class="slider__list">
      <SquareSlider 
        v-for="p in photos"
        v-bind:id="p.id"
        v-bond:key="p.id">
      </SquareSlider>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PhotoLibrary',
  props: [photos],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  
</style>
