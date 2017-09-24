import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import FormTest from '@/components/FormTest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/formtest',
      name: 'FormTest',
      component: FormTest
    }
  ]
})
