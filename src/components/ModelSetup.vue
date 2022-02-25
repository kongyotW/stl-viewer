<template>
  <section>
    <v-card>              
      <v-card-text>  
        <p><b>Name :</b> {{stlDemoModel.name}}</p>                                               
        <div v-if="this.stlDemoModel.loading"><b>loading... {{this.stlDemoModel.progress_load_value}}%</b> </div>        
        <section v-if="this.stlDemoModel.load_complete">                    
          <p><b>Size (mm) :</b> </p>      
          <v-checkbox :label="`Show`" v-model="demo_model_property.visible"></v-checkbox>      
          <v-combobox v-model="demo_model_property.color_select" :items="items_color" label="Color"></v-combobox>                     
        </section>
      </v-card-text>
    </v-card> 
    
  </section>      
</template>
<script>
export default {    
  data () {
    return {   
      demo_model_property : {
        color_select : 'Gray',
        visible : true
      },     
      chk_visible : 'true',    
      property : '',       
      color_select: 'Gray',
      items_color: ['Gray','Green','Blue','Red'],
      color_code : {
        'Gray' : '0xfeece1',
        'Green' : '0x00ff00',
        'Blue' : '0x0000ff',
        'Red' : '0xff0000'
        },
      colorMap : new Map()      
    }
  },
  computed: {  
    stlDemoModel : function () {
      console.log(this.$store.state.stlDemoModel)
      return this.$store.state.stlDemoModel
    },
  },
  watch: {
    color_select (val) {      
      var mesh_property = { 
        color_code : this.color_code[val],
        visible: this.chk_visible}
      this.$store.commit('SET_STL_DEMO_MODEL_PROPERTY', {mesh_property : mesh_property})
    },
    demo_model_property : {
      
      handler: function () {
        console.log('demo_model_property')
        var color_code = this.color_code[this.demo_model_property.color_select]
        var mesh_property = { 
          color_code : color_code,
          visible: this.demo_model_property.visible
        }
        this.$store.commit('SET_STL_DEMO_MODEL_PROPERTY', {mesh_property : mesh_property})        
       },
      deep: true
    },
  },
  methods: {    
  },
  mounted() {
    this.colorMap.set('Gray','0xfeece1')
    this.colorMap.set('Green','0x00ff00')
    this.colorMap.set('Blue','0x0000ff')
    this.colorMap.set('Red','0xff0000')    
  }
}
</script>

<style>
</style>
