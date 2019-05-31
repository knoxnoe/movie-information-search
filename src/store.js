import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BaseConfig = {//一些全局变量（关于配置...）
  state: {
    httpsurl: 'http://editme.top:8000'
  },
  mutations: {

  },
  actions: {

  }
}

const UserState = {//登陆用户状态管理
  state: {

  },
  mutations: {

  },
  actions: {

  }
}

export default new Vuex.Store({
  modules:{
    BaseConfig: BaseConfig,
    UserState: UserState
  }
})
