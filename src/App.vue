<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'intersection-observer';
import '@/addons/wheel-event-polyfill';
export default {
  name: 'App'
}
</script>

<style>
	body{
		background-color: #252525;
		overflow: hidden;
		margin: 0;
		padding: 0;
	}

	#app {
		font-family: 'Karla', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #fff;
    	overflow:hidden;
	}

  	h1{
		font-family: 'Montserrat', sans-serif;
	}
</style>
