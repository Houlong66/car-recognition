import Home from '@/views/Home.vue'
import NotFound from '@/views/404'

const routes = [{
  path: '/404',
  component: NotFound,
},
{
  path: '/',
  name: 'home',
  component: Home,
},
{
  path: '*',
  redirect: '/404'
}
]

export default routes