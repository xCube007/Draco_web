import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui'
import {
  Input,
  Button,
  Alert,
  Icon,
  Container,
  Header,
  Pagination,
  Table,
  TableColumn,
  Main,
  Switch,
  Message,
  MessageBox,
  Menu,
  MenuItem,
  RadioGroup,
  RadioButton
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './assets/js/axios'
import moment from 'moment'
import getUrl from './assets/js/url'
import VueParticles from 'vue-particles' // 星空背景

Vue.use(VueParticles)
Vue.use(Input)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// import Particles from 'particlesjs'
// Vue.prototype.$Particles = Particles

// Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$url = getUrl
Vue.config.productionTip = false

Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
