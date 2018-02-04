import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PhotoLibrary from '@/components/PhotoLibrary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PhotoLibrary',
      component: PhotoLibrary
    }
  ]
})
