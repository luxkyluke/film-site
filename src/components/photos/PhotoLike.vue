<template>
	<a v-on:click="handleClick" class="link">
		<div class="like">
          <div class="like__heart" :class="isLiked ? 'liked' : ''">
          	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 33.9 29.6" style="enable-background:new 0 0 33.9 29.6;" xml:space="preserve">
			<g id="heart__red" class="heart__red">
				<g class="st1">
					<g transform="translate(-141.000000, -138.000000)">
						<g transform="translate(141.000000, 138.000000)">
							<path class="st2" d="M16.9,28.9l-0.6-0.5C4.1,18.4,0.7,14.9,0.7,9.2c0-4.7,3.8-8.5,8.5-8.5c3.9,0,6.2,2.2,7.6,3.9
								c1.5-1.7,3.7-3.9,7.6-3.9c4.7,0,8.5,3.8,8.5,8.5c0,5.7-3.3,9.2-15.6,19.3L16.9,28.9L16.9,28.9z"/>
						</g>
					</g>
				</g>
			</g>
			<g id="heart">
				<g>
					<g transform="translate(-141.000000, -138.000000)">
						<g transform="translate(141.000000, 138.000000)">
							<path d="M16.9,29.6l-0.6-0.5C3.5,18.6,0,14.9,0,8.9C0,4,4,0,8.9,0c4.1,0,6.4,2.3,8,4.1c1.6-1.8,3.9-4.1,8-4.1
								c4.9,0,8.9,4,8.9,8.9c0,6-3.5,9.7-16.3,20.1L16.9,29.6L16.9,29.6z M8.9,1.9C5,1.9,1.9,5,1.9,8.9c0,5.1,3.2,8.6,15.1,18.2
								C28.8,17.5,32,14.1,32,8.9c0-3.9-3.2-7.1-7.1-7.1c-3.6,0-5.4,2.1-6.9,3.8l-1.1,1.2l-1.1-1.2C14.4,4,12.5,1.9,8.9,1.9L8.9,1.9z"
								/>
						</g>
					</g>
				</g>
			</g>
			</svg>
          </div>
          <p class="like__nb">{{nb}}</p>
		</div>
	</a>
</template>

<script>
// import heart from '@/asset/icon/heart.svg'

export default {
  name: 'Like',
  props: { 
  	nb: Number
  },
  data(){
  	return {
  		isLiked:false,
  	}
  },
  methods:{
	handleClick: function() {
		if(!this.isLiked){
			this.$emit("increaseLike")
			this.isLiked = true
		}else{
			this.$emit("decreaseLike")
			this.isLiked = false
		}
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  	@import '~sass/main.scss';
	.like{
		text-align:center;
		&__heart{
			width: 20px;

			&.liked{
				.heart__red{
					opacity:1;
				}
			}
		}
		.heart__red{
			opacity:0;
			@include transition(opacity 200ms ease-in-out)
		}
		.st1{display:inline;}
		.st2{fill:#E51717;}
	}
</style>
