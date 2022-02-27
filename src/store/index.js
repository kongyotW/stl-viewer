import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.config.debug = false
const debug = false

export default new Vuex.Store({
  modules: {},
  state: {
    userUploadFile: null,
    stlUploadModel: {
      name : '',
      url: '',      
      mesh : null,      
      autoRotate : true,
      size : '',
      loading : true,
      loadComplete: false,
      progressLoadValue : 0,
      meshProperty : {
        color_code:'0xfeece1',
        visible : true
      },
    },
    stlDemoModel: {
      name : 'Dragon',
      url: 'static/models/stl/Dragon.STL',
      mesh : null,      
      autoRotate : true,
      size : '',
      loading : true,
      loadComplete: false,
      progressLoadValue : 0,
      meshProperty : {
        color_code:'0xfeece1',
        visible : true
      },            
    },  
    autoRotateModels: false,    
  },
  mutations: {
    SET_USER_UPLOADED_FILE(state, payload){      
      state.userUploadFile = payload.userUploadFile
      console.log(state.userUploadFile)
    },
    SET_STL_UPLOADED_MODEL(state, payload){      
      state.stlUploadModel = payload.stlUploadModel
    },       
    SET_STL_UPLOADED_MODEL_PROPERTY(state,payload){            
      state.stlUploadModel.meshProperty = payload.meshProperty      
    },
    SET_STL_DEMO_MODEL_PROPERTY(state,payload){            
      state.stlDemoModel.meshProperty = payload.meshProperty      
    },
    SET_PROGRESS_DEMO_MODEL_COMPLETE(state){      
      state.stlDemoModel.loadComplete = true
      state.stlDemoModel.loading = false      
    },        
    SET_PROGRESS_DEMO_MODEL(state,payload){      
      state.stlDemoModel.progressLoadValue = payload.progressLoadValue      
    },
    SET_AUTO_ROTATE_MODEL(state,payload){      
      state.autoRotateModels = payload      
    },           
  },
  getters: {    
    getUserUploadFile(state){
      return state.userUploadFile
    },
    getstlUploadModel(state){
      return state.stlUploadModel
    },
    getStlDemoModel(state){
      return state.stlDemoModel
    },
    getAutoRotateModels(state){
      return state.autoRotateModels
    }
  },  
  actions: {
    setAutoRotateModels: ({commit, state}, newValue) => {      
      commit('SET_AUTO_ROTATE_MODEL', newValue)
      return state.autoRotateModels
    },
  },
  strict: debug
})
