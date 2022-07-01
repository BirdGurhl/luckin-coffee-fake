import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';
import {
  Button,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Search,
  Toast,
  NavBar,
  GoodsAction, 
  GoodsActionIcon, 
  GoodsActionButton,
  Stepper,
  Divider,
  Form,
  Field,
  Popup,
  Checkbox, 
  CheckboxGroup,
  SubmitBar,
  AddressList
} from 'vant'


Vue.use(AddressList);

Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);

Vue.use(Divider);
Vue.use(Stepper);

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Button)

//axios拦截器，在发起请求之前执行
axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);

    // 

  }

  //必须返回config
  return config;
})




import 'lib-flexible/flexible'
Vue.config.productionTip = false

Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
