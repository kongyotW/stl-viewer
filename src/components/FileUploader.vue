<template>
  <div style="border-style:solid;" @dragover.prevent @drop.prevent>
      <input type="file" multiple @change="uploadFile"/>
      <div @drop="dragFile" style="background-color:green;margin-bottom:10px;padding:10px;">
        Or drag the file here
        <div v-if="File.length">
          <ul v-for="file in File" :key="file">
            <li>{{file.name}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      File: [], // Store our uploaded files
    };
  },
  methods: {
      uploadFile(e) {
        this.File = e.target.files;
        console.log('uploadFile...')
        console.log(this.File)
        this.$store.commit('SET_STL_FILE', { stlfile: this.File })
      },
      dragFile(e) {
        this.File = e.dataTransfer.files
        console.log('dragFile...')
      }
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>