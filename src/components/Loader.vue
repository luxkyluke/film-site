<template>
	<div class="loader">
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
		<span class="loader__span"></span>
	</div>
</template>

<script>

export default {
  name: 'Loader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	$width: 2px;
	$height: 15px;
	$color: #727474;

	span{
		display: inline-block;
		height: $width;
		width: $height;
		background: $color;
 	}

	@for $i from 1 through 35 {
		.loader span:nth-child(#{$i}){
			animation:animLoader 1.3s ($i * 0.039s) infinite cubic-bezier(0,0,1,1);
			width: 2px;
			height: 7px;
			margin:0 3px;
		}
	}



	@keyframes animLoader {
	  35% {
	    -webkit-transform: scale(1);
	            transform: scale(1);
	    background: $color;
	  }
	  50% {
	    -webkit-transform: scale(1,5);
	            transform: scale(1,5);
	    background: lighten($color, 50%);
	  }
	  65% {
	    -webkit-transform: scale(1);
	            transform: scale(1);
	    background: $color;
	  }
	  100% {
	    -webkit-transform: scale(1);
	            transform: scale(1);
	    background: $color;
	  }
	}
	
</style>
