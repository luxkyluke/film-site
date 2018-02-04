import SliderQuare from '@/components/SliderQuare'


<template>
  <div class="slider-square" 
    v-bind:class="size">
  </div>
</template>

<script>
export default {
  name: 'SliderSquare',
  props: [size]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  
</style>
