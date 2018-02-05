<template>
	<a v-on:click="handleClick" class="link">
		<div class="slider-square" 
			v-bind:class="size">
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
  	.link:hover > .slider-square{
  		background-color:red;
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
  			background-color:#000;
  		}
	}

	.slider-square{
		background-color:#e6e6e6;
		@include transition(all 100ms ease-out) 
		width:2px;
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
			background-color:#000;
			//width:30px;
			height:40px;
		}
	}
</style>
