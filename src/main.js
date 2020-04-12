
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import {Loading} from "element-ui";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/*import Vuex from 'vue x'
Vue.use(Vuex)*/

Vue.config.productionTip = false

// 构建全局的axios请求函数
axios.defaults.baseURL = 'http://localhost';
let futureAxios = (option) => {
  let loadingInstance;
  if (!option.hideWaiting) {
    loadingInstance = Loading.service();
  }
  if (!option.type) {
    option.type = 'POST';
  }
  axios({
    headers: {
      'token': window.localStorage.getItem('token')
    },
    method: option.type? option.type : 'post',
    url: option.url,
    data: option.type.toLowerCase() == 'post'?option.data:null,
    params: option.type.toLowerCase() == 'get'?option.data:null
  }).then(function (response) {
    loadingInstance.close();
    let result = response.data;
    if (option.success) {
      option.success(result);
    }
  }).catch(function (error) {
    loadingInstance.close();

    if (option.error) {
      option.error(error);
    } else {
      if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        window.vm.$message.error(error.response.data);
        if (error.response.data == '会话已过期，请重新登录') {
          window.vm.$router.push('/');
        }
      } else if (error.request) {

        console.log(error.request);
        window.vm.$message.error('请求异常，请检查网络状态');
      } else {

        console.log('Error', error.message);
        window.vm.$message.error("请求异常");
      }
      console.log(error.config);
    }

  });
}
Vue.prototype.$axios = futureAxios;


window.vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
