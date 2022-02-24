<template>
  <div id="app">    
    <FileUploader/>
    

    <v-container id="main">
        <v-layout row wrap>
          <v-flex xs12 sm12 md2 lg2 align-center>
            <v-checkbox :label="`Auto Rotate`" v-model="chk_auto_rotate" v-if="1"></v-checkbox>                         
            <ModelSetup data-app/>
            <!-- <v-divider/>
            <ModelSetup data-app/> -->
          </v-flex>
          <v-flex xs12 sm12 md10 lg10 align-center>
            <!-- <div class="text-xs-center" v-if="progress_All.loading">              
              <v-progress-circular :rotate="360" :size="progress_All.size" :width="15" 
              :value="progress_All.value" color="teal">
                loading models: {{ progress_All.value }}%
              </v-progress-circular>
            </div> -->
            <TheCanvas/>
         </v-flex>         
        </v-layout>
      </v-container>

  </div>
</template>

<script>
import FileUploader from './components/FileUploader.vue'
import TheCanvas from './components/TheCanvas.vue'
import ModelSetup from './components/ModelSetup.vue'

export default {
  name: 'App',
  components: {    
    FileUploader,
    TheCanvas,
    ModelSetup
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
