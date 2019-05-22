import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import about from '@/components/about'
import news from '@/components/news'
import newDetails from '@/components/news-details'
import productCenter from '@/components/product-center'
import shopCenter from '@/components/shop-center'
import productDetails from '@/components/product-details'
import register from '@/components/register'
import cart from '@/components/cart/my-cart'
import order from '@/components/cart/order'
import pay from '@/components/cart/pay'
import personMes from '@/components/person-mesg'
import personData from '@/components/person-routerview/person-data'
import personAddress from '@/components/person-routerview/person-address'
import personFavorite from '@/components/person-routerview/person-favorite'
import personOrder from '@/components/person-routerview/person-order'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'index', component: index},
      {path: '/about', name: 'about', component: about},
      {path: '/news', name: 'news', component: news},
      {path: '/newDetails/:nid', name: 'newDetails', component: newDetails},
      {path: '/productCenter', name: 'productCenter', component: productCenter},
      {path: '/shopCenter', name: 'shopCenter', component: shopCenter},
      {path: '/cart', name: 'cart', component: cart},
      {path: '/order', name: 'order', component: order},
      {path: '/pay', name: 'pay', component: pay},
      {path: '/register', name: 'register', component: register},
      {path: '/productDetails/:pid', name: 'productDetails', component: productDetails},
      {path: '/personMes/', name: 'personMes', component: personMes,
          //重定向
          redirect: '/personMes/personData',
          children:[{path:"personData",component:personData},
              {path:"personAddress",component:personAddress},
              {path:"personFavorite",component:personFavorite},
              {path:"personOrder",component:personOrder},
              // {path:"/",component:personData},
          ]
      },
  ]
})
