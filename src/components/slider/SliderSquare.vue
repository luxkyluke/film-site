<template>
	<a v-on:click="handleClick" class="link">
		<div class="slider-square" 
			v-bind:class="size"
			>
		</div>
	</a>
</template>

<script>

export default {
  name: 'SliderSquare',
  props: {
  	size: String, 
  	id: Number
  },
  methods:{
	handleClick: function() {
		this.$emit("changeId", this.id)
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  	@import '~sass/main.scss';
	$colorMax : #fff;
	$colorDefault : #949494;
	$colorHover : $colorMax;

	@include laptop{
	  	.link:hover > .slider-square{
	  		background-color:$colorHover;
	  		&.default-size{
				height:20px;
	  		}
	  		&.small-size{
				height:25px;
	  		}
	  		&.big-size{
				height:35px;
	  		}
	  		&.maxi-size{
	  			background-color:$colorMax;
	  		}
		}
	}
	
	.test{
		position:absolute;
	}

	.slider-square{
		background-color:$colorDefault;
		@include transition(all 100ms ease-out) 
		width:1px;
		height:10px;
		margin:	0 4px;
		cursor: pointer;
		
		&.small-size{
			//width:20px;
			height:20px;

		}
		&.big-size{
			//width:25px;
			height:30px;
		}
		&.maxi-size{
			background-color:$colorMax;
			//width:30px;
			height:40px;
		}
	}

	@media (max-width: 350px){
		.slider-square{
			margin:	0 3.5px;
		}
	}
</style>
