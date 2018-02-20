<template>
  <div class="photos">
    <photo
        v-for= "p in photos"
        v-bind:key= "p.id"
        :photo="p"
        :isCurrent= "p.id === currentId"
      ></photo>
  </div>
</template>

<script>
import Photo from '@/components/photos/Photo'

export default {
  name: 'Photos',
  props: {
    photos: Array,
    currentId: {
      type: Number,
      default: 0
    }
  },
  components: {
    'photo': Photo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .photos{
    height:50vh;
    white-space: nowrap;
    transform: translateY(-50%);
    top: 50%;
    position: absolute;
    width: 100%;
  }

</style>
