import Vue from 'vue'
import Router from 'vue-router'
import VueLazyload from 'vue-lazyload'
import Gallery from '@/components/Gallery'
import Utility from '@/addons/utility'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
Vue.use(VueLazyload, {
    filter: {
		progressive (listener, options) {
			listener.el.setAttribute('lazy-progressive', 'true')
			listener.loading = Utility.getBlur(listener.src)
		}
    }
})


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: Gallery
    }
  ]
})
