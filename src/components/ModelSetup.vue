<template>
  <section>
    <v-card>              
      <v-card-text>  
        <p><b>Name :</b> {{stlDemoModel.name}}</p>                                               
        <div v-if="this.stlDemoModel.loading"><b>loading... {{this.stlDemoModel.progress_load_value}}%</b> </div>        
        <section v-if="this.stlDemoModel.load_complete">                    
          <p><b>Size (mm) :</b> </p>      
          <v-checkbox :label="`Show`" v-model="chk_visible"></v-checkbox>      
          <v-combobox v-model="color_select" :items="items_color" label="Color"></v-combobox>                     
        </section>
      </v-card-text>
    </v-card> 
  </section>      
</template>
<script>
export default {    
  data () {
    return {        
      chk_visible : 'true',    
      property : '',       
      color_select: 'Gray',
      items_color: [
        'Gray','Green','Blue','Red'
      ],
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
