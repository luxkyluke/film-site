<template>
	<a v-on:click="handleClick" class="link">
		<li class="slider-square" 
			v-bind:class="size">
		</li>
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
  	.link:hover > .slider-square{
  		&.default-size{
			//@include transform(scale(1.2))
  		}
  		&.small-size{
			//@include transform(scale(1.5))
  		}
  		&.big-size{
			//@include transform(scale(1.8))
  		}
	}

	.slider-square{
		background-color:#e6e6e6;
		@include transition(all 250ms ease-in-out) 
		width:15px;
		height:15px;
		margin:	2px;
		
		&.default-size{
			//@include transform(scale(1))
		}
		&.small-size{
			//@include transform(scale(1.3))
			
			width:20px;
			height:20px;
			//margin:	3px;

		}
		&.big-size{
			//@include transform(scale(1.6))
			//margin:	4px;
			width:25px;
			height:25px;
		}
		&.maxi-size{
			//@include transform(scale(2))
			//margin:	5px;		
			background-color:red;
			width:30px;
			height:30px;
		}
	}
</style>
