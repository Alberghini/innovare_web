import Vue from 'vue'

import 'jquery';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'popper.js';

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

//Icons
import 'vue-material-design-icons/styles.css'
import Menu from 'vue-material-design-icons/Menu.vue'
import Home from 'vue-material-design-icons/Home.vue'
import Power from 'vue-material-design-icons/Power.vue'
import CashRefund from 'vue-material-design-icons/CashRefund.vue'
import History from 'vue-material-design-icons/History.vue'
import FormatListBulletedType from 'vue-material-design-icons/FormatListBulletedType.vue'
import EyeOutline from 'vue-material-design-icons/EyeOutline.vue'
import AccountDetails from 'vue-material-design-icons/AccountDetails.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import ArrowTopRight from 'vue-material-design-icons/ArrowTopRight.vue'
import Eraser from 'vue-material-design-icons/Eraser.vue'
import GestureDoubleTap from 'vue-material-design-icons/GestureDoubleTap.vue'
import ThumbUpOutline from 'vue-material-design-icons/ThumbUpOutline.vue'
import ThumbDownOutline from 'vue-material-design-icons/ThumbDownOutline.vue'

import MakeRefund from './components/makeRefund.vue'
import Login from './components/login.vue'
import RefundList from './components/refundList.vue'
import RefundHistoric from './components/refundHistoric.vue'
import CreateTypeRefund from './components/createTypeRefund.vue'
import RefundTypesList from './components/refundTypesList.vue'
import Admin from './components/admin.vue'
import Welcome from './components/welcome.vue'
import Worker from './components/worker.vue'
import Nav from './components/nav.vue'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueAxios, axios)
Vue.component("Menu", Menu)
Vue.component("Home", Home)
Vue.component("Power", Power)
Vue.component("EyeOutline", EyeOutline)
Vue.component("CashRefund", CashRefund)
Vue.component("History", History)
Vue.component("Pencil", Pencil)
Vue.component("FormatListBulletedType", FormatListBulletedType)
Vue.component("AccountDetails", AccountDetails)
Vue.component("Plus", Plus)
Vue.component("Delete", Delete)
Vue.component("ArrowTopRight", ArrowTopRight)
Vue.component("Eraser", Eraser)
Vue.component("GestureDoubleTap", GestureDoubleTap)
Vue.component("ThumbDownOutline", ThumbDownOutline)
Vue.component("ThumbUpOutline", ThumbUpOutline)


const ws_path = 'http://localhost\\innovare_ws\\';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { name: '/', path: '/', component: Login },
    { name: 'admin', path: '/admin', component: Admin,
      children:[
        { name: 'welcomeAdmin', path: 'welcome', component: Welcome },
        { name: 'refundList', path: 'refundList', component: RefundList },
        { name: 'refundHistoric', path: 'refundHistoric', component: RefundHistoric },
        { name: 'createTypeRefundId', path: 'createTypeRefund/:id', component: CreateTypeRefund },
        { name: 'createTypeRefund', path: 'createTypeRefund', component: CreateTypeRefund },
        { name: 'refundTypesListMessage', path: 'refundTypesList/:message', component: RefundTypesList },
        { name: 'refundTypesList', path: 'refundTypesList', component: RefundTypesList },
        { path: '**', redirect: 'welcome' }
      ],
      beforeEnter: (to, from, next) => {
        if(localStorage.logged == 'true' && localStorage.isAdmin == 'true') next();
        else next('/');
      }
    },
    { name: 'worker', path: '/worker', component: Worker,
      children: [
        { name: 'welcomeWorker', path: 'welcome', component: Welcome },
        { name: 'makeRefund', path: 'makeRefund', component: MakeRefund },
        { path: '**', redirect: 'welcome' }
      ],
      beforeEnter: (to, from, next) => {
        if(localStorage.logged == 'true' && localStorage.isAdmin == 'false') next();
        else next('/');
      }
    },
    { path: '**', redirect:'/' }

  ]
})

router.beforeEach((to, from, next) => {
  if(to.path != '/'){
    if(localStorage.logged === 'true'){
      next();
    }
    else next('/');
  }
  next();
})


new Vue({
  router,
  axios,
  ws_path,
  render: h => h(App),
}).$mount('#app')
