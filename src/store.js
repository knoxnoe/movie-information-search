import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
var VueCookie = require('vue-cookie');

const BaseConfig = {//一些全局变量（关于配置...）
  state: {
    httpsUrl: 'http://editme.top:8000'
  },
  mutations: {

  },
  getters: {

  },
  actions: {

  }
}

const UserState = {//登陆用户状态管理
  state: {

  },
  mutations: {

  },
  getters: {

  },
  actions: {

  }
}

const PageState = {//页面状态管理
  state: {
    hashUrl: VueCookie.get('hashUrl')//'/'
  },
  mutations: {
    saveHashUrl(state,hash) {
      state.hashUrl = hash
      VueCookie.set('hashUrl', hash , 1);
    }
  },
  getters: {

  },
  actions: {

  }
}

export default new Vuex.Store({
  modules:{
    BaseConfig: BaseConfig,
    UserState: UserState,
    PageState: PageState
  }
})
