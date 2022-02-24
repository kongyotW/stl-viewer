import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
Vue.config.debug = false
// const debug = process.env.NODE_ENV !== 'production'
const debug = false

export default new Vuex.Store({
  modules: {    
  },
  state: {
    stlfile: '',
    stlDemoModel: {
      name : 'Dragon',
      url: 'static/models/stl/Dragon.STL',
      mesh : null,
      visible : true,
      auto_rotate : true,
      size : '',
      loading : true,
      load_complete: false,
      progress_load_value : 0
    }
  },
  mutations: {
    SET_STL_FILE(state,payload){      
      state.stlfile = payload.stlfile
    },        
    SET_STL_DEMO_MODEL_LOAD_COMPLETE(state){      
      state.stlDemoModel.load_complete = true
      state.stlDemoModel.loading = false      
    },        
    SET_STL_DEMO_MODEL_LOAD_PROGRESS(state,payload){      
      state.stlDemoModel.progress_load_value = payload.progress_load_value
      console.log('progress_load_value : ' +  state.stlDemoModel.progress_load_value)
    },        
  },
  getters: {    
    getStlFile(state){
      return state.stlfile
    },
    getStlDemoModel(state){
      return state.stlDemoModel
    }

  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
