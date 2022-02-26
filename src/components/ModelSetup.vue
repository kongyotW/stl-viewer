<template>
  <section>
    <v-checkbox :label="`Auto Rotate`" v-model="autoRotateModels" v-if="1"></v-checkbox>
    <v-card>              
      <v-card-text>  
        <p><b>Name :</b> {{stlDemoModel.name}}</p>
        <div v-if="this.stlDemoModel.loading"><b>loading... {{this.stlDemoModel.progressLoadValue}}%</b> </div>        
        <section v-if="this.stlDemoModel.loadComplete">
          <p><b>Size (mm) :</b> </p>      
          <v-checkbox :label="`Show`" v-model="stlDemoModelProperty.visible"></v-checkbox>      
          <v-combobox v-model="stlDemoModelProperty.color_select" :items="items_color" label="Color"></v-combobox>                     
        </section>
      </v-card-text>
    </v-card> 
    <v-card>              
      <v-card-text>  
        <p><b>Name :</b> {{stlUploadModel.name}}</p>
        <div v-if="this.stlUploadModel.loading"><b>loading... {{this.stlUploadModel.progressLoadValue}}%</b> </div>        
        <section v-if="this.stlUploadModel.loadComplete">
          <p><b>Size (mm) :</b> </p>      
          <v-checkbox :label="`Show`" v-model="stlUserModelProperty.visible"></v-checkbox>      
          <v-combobox v-model="stlUserModelProperty.color_select" :items="items_color" label="Color"></v-combobox>                     
        </section>
      </v-card-text>
    </v-card>
  </section>      
</template>
<script>
export default {    
  data () {
    return {
      stlDemoModelProperty : {
        color_select : 'Gray',
        visible : true
      },
      stlUserModelProperty : {
        color_select : 'Gray',
        visible : true
      },
      items_color: ['Gray','Green','Blue','Red'],
      color_code : {
        'Gray' : '0xfeece1',
        'Green' : '0x00ff00',
        'Blue' : '0x0000ff',
        'Red' : '0xff0000'
        }  
    }
  },
  computed: {
    stlUploadModel : function () {
      return this.$store.getters.getstlUploadModel
    },
    stlDemoModel : function () {
      return this.$store.getters.getStlDemoModel
    },    
    autoRotateModels: {
      get () {
        return this.$store.state.autoRotateModels
      },
      set (newValue) {
        console.log('newValue : ' + newValue)
        return this.$store.dispatch('setAutoRotateModels', newValue)
      }
    }    
  },
  watch: {    
    stlDemoModelProperty : {      
      handler: function () {
        console.log('stlDemoModelProperty')
        var color_code = this.color_code[this.stlDemoModelProperty.color_select]
        var meshProperty = { 
          color_code : color_code,
          visible: this.stlDemoModelProperty.visible
        }
        this.$store.commit('SET_STL_DEMO_MODEL_PROPERTY', {meshProperty : meshProperty})
       },
      deep: true
    },
    stlUserModelProperty : {      
      handler: function () {
        console.log('stlUserModelProperty')
        var color_code = this.color_code[this.stlUserModelProperty.color_select]
        var meshProperty = { 
          color_code : color_code,
          visible: this.stlUserModelProperty.visible
        }
        this.$store.commit('SET_STL_UPLOADED_MODEL_PROPERTY', {meshProperty : meshProperty})
       },
      deep: true
    },    
  },
  methods: {    
  },
  mounted() {
     
  }
}
</script>

<style>
</style>
