import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import ProductAdd from './views/ProductAdd.vue'
import ProductSearch from './views/ProductSearch.vue'
import ProductList from './views/ProductList.vue'
import UserList from './views/UserList.vue'
import UserSearch from './views/UserSearch.vue'
import Stat from './views/Stat.vue'



Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Login},
    { path: '/login', component: Login},
     { path: '/main', component: Main,children:[
         {path:'',component:Stat},
         {path:'stat',component:Stat},
         {path:'padd',component:ProductAdd},
         {path:'psearch',component:ProductSearch},
         {path:'plist',component:ProductList},
         {path:'ulist',component:UserList},
         {path:'usearch',component:UserSearch}

     ]}
  ]
})
