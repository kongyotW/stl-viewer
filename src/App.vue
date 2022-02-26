<template>
  <div id="app">    
    <FileUploader/>    
    <v-container id="main">
        <v-layout row wrap>
          <v-flex xs12 sm12 md2 lg2 align-center>                                     
            <ModelSetup data-app/>            
          </v-flex>
          <v-flex xs12 sm12 md10 lg10 align-center>            
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
