<template>
  <div style="border-style:solid;" @dragover.prevent @drop.prevent>
      <input type="file" multiple @change="uploadFile"/>
      <div @drop="dragFile" style="background-color:green;margin-bottom:10px;padding:10px;">
        Or drag the file here
        <div v-if="File.length">
          <ul v-for="file in File" :key="file.name">
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
        this.$store.commit('SET_USER_UPLOADED_FILE', { userUploadFile: this.File })
      },
      dragFile(e) {
        this.File = e.dataTransfer.files
        this.$store.commit('SET_USER_UPLOADED_FILE', { userUploadFile: this.File })
      }
  },
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
</style>