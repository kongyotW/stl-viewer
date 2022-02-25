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
      auto_rotate : true,
      size : '',
      loading : true,
      load_complete: false,
      progress_load_value : 0,
      mesh_property : {
        color_code:'0xfeece1',
        visible : true
      },
      
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
    SET_STL_DEMO_MODEL_PROPERTY(state,payload){            
      state.stlDemoModel.mesh_property = payload.mesh_property
      console.log('[mutations SET_STL_DEMO_MODEL_PROPERTY] state.stlDemoModel.mesh_property');
    }
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
