<template>
	<div class='lazy-loader'>
		<img
		  :class="'lazy-loader__image ' + inClass + isBlury ? ' hide':''" 
		  :style="inStyle"
		  :src="src"
		  @onLoad="handleLoaded"
		  />
		<img
		  class="'lazy-loader__image ' + inClass + isBlury ? '':' hide'" 
		  :class="isBlury ? '':'hide'"
		  :src="blur"
	  	/>
	</div>
</template>

<script>
// import heart from '@/asset/icon/heart.svg'
import Utility from '@/addons/utility'

export default {
  name: 'LazyLoader',
  props: { 
  	src: String,
  	inClass : String,
  	inStyle : String,
  },
  data(){
  	return {
  		blur: Utility.getBlur(this.src),
  		isBlury:true
  	}
  },
  methods:{
	handleLoaded: function() {
		isBlury : false;
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  	@import '~sass/main.scss';
	.lazy-loader{
		&__image, &__blur{
			// @extend .full;
			@include transition(opacity 200ms esae-in-out);
			&.hide{
				opacity:0;
			}
		}
	}
</style>
