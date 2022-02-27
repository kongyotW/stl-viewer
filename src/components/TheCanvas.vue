<template>
  <div id="scene3d">
    <canvas id="canvas3d"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  components: {  },   
  data () {
    return {                
      meshDemo : null,   
      meshUploaded :null,           
      pivot: null,                          
      CANVAS_WIDTH: 0,
      CANVAS_HEIGHT: 0,
      container:'',camera:'',
      cameraTarget:'', scene:'',
      renderer:'',controls:'',
      directionalLight :''                     
    }
  },
  methods: {      
      addUserStlModel: function(fileList){                
        var reader = new FileReader()
        var _this = this
        reader.onload = function (e) {
          var STLLoader = require('three-stl-loader')(THREE)
          var loader = new STLLoader()
          var geometry = loader.parse(e.target.result)          
          var material = new THREE.MeshLambertMaterial()
          _this.meshUploaded = new THREE.Mesh( geometry, material )   
          
          var stlUploadModel = {
            name : 'Dragon',
            url: '',      
            mesh : _this.meshUploaded,      
            autoRotate : true,
            size : '',
            loading : false,
            loadComplete: true,
            progressLoadValue : 100,
            meshProperty : {
              color_code:'0xfeece1',
              visible : true
            }
          }
          _this.$store.commit('SET_STL_UPLOADED_MODEL',{stlUploadModel:stlUploadModel}) 
          _this.scene.add(_this.meshUploaded)
        }
        reader.readAsArrayBuffer(fileList[0])
      },
      initScene: function() {                    
        this.container = document.getElementById("scene3d")
        let padding = 24       
        this.CANVAS_WIDTH = this.container.clientWidth
        this.CANVAS_HEIGHT = window.innerHeight - (padding*2)

        this.camera = new THREE.PerspectiveCamera(100, this.CANVAS_WIDTH / this.CANVAS_HEIGHT, 1, 1500);            
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x5E5EBB)                

        //Set Mesh To Center
        var box = new THREE.Box3().setFromObject( this.meshDemo )
        box.center(  this.meshDemo.position ) // this re-sets the mesh position
        this.meshDemo.position.multiplyScalar( - 1 )       

        //Grouping Mesh
        var obj3DCombine = new THREE.Object3D()
        obj3DCombine.add( this.meshDemo )
        
        //Add Group to pivot for rotation aroud themself
        this.pivot = new THREE.Group()
        this.scene.add(this.pivot)
        this.pivot.add(obj3DCombine)

        // Lights
        // White directional light at half intensity shining from the top.
        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 )
        this.scene.add( this.directionalLight)
    
        // renderer
        var canvas = document.getElementById("canvas3d")
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
        this.renderer.setPixelRatio(window.devicePixelRatio)    
        this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT)          
        this.renderer.gammaInput = true
        this.renderer.gammaOutput = true
        this.renderer.shadowMap.enabled = true

        var OrbitControls = require('three-orbit-controls')(THREE)        
        this.controls = new OrbitControls( this.camera, canvas )        
                
        this.camera.position.set(0, 0, 200)                 
        // this.camera.position.set(-0.08335522236302186, -330.7635620041993, 31.27798477519234)
        // this.cameraTarget = new THREE.Vector3(0, 0, 0);
        this.controls.update()
        window.addEventListener('resize', this.onWindowResize, false)           
    },
    loadingDemoModel: function(){
      var _this = this
      var manager = new THREE.LoadingManager()
      manager.onStart = function ( ) {}
      manager.onLoad = function ( ) {       
        _this.initScene()
        _this.animate()
      }
      manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
      }
      manager.onError = function (  ) {
        window.alert("Load model error!, Please refresh this page.")        
      }
      
      var STLLoader = require('three-stl-loader')(THREE)
      var loaderDemo = new STLLoader(manager)
      loaderDemo.load(this.$store.state.stlDemoModel.url, function (geometry) {           
        var material = new THREE.MeshLambertMaterial()
        material.color.setHex( 0xfeece1 )

        _this.meshDemo = new THREE.Mesh(geometry, material)        
        _this.$store.commit('SET_PROGRESS_DEMO_MODEL_COMPLETE')           
        _this.meshDemo.scale.set(1, 1, 1)  

      }, this.loadingWacther)
      
    },      
    loadingWacther: function (xhr){            
      var progressLoadValue = Math.round(xhr.loaded / xhr.total * 100)
      this.$store.commit('SET_PROGRESS_DEMO_MODEL', {progressLoadValue : progressLoadValue})     
    },        
    onWindowResize: function () {        
      let padding = 24
      this.CANVAS_WIDTH = this.container.clientWidth
      this.CANVAS_HEIGHT = window.innerHeight - (padding*2)
      this.camera.aspect = this.CANVAS_WIDTH / this.CANVAS_HEIGHT
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
    },
    animate: function() {
      requestAnimationFrame(this.animate)                
      this.controls.update()   
      this.render()     
    },
    render () {                       
      if(this.pivot != null){                
        if(this.$store.state.autoRotateModels) this.pivot.rotation.z += 0.02
      }       
      this.directionalLight.position.copy( this.camera.position ) //Light follow camera      
      this.renderer.render(this.scene, this.camera)
    },
    setupDemoModelMeshProperty (mesh_property){        
      this.meshDemo.material.visible = mesh_property.visible
      this.meshDemo.material.color.setHex(mesh_property.color_code)            
    },
    setupUploadModelMeshProperty (mesh_property){        
      this.meshUploaded.material.visible = mesh_property.visible
      this.meshUploaded.material.color.setHex(mesh_property.color_code)            
    }
  },
  computed: {
    userUploadFile () {      
      return this.$store.getters.getUserUploadFile
    },
    stlDemoModel () {
      return this.$store.getters.getStlDemoModel
    },     
    stlDemoModelMeshProperty (){      
      return this.$store.state.stlDemoModel.meshProperty
    },
    stlUploadModelMeshProperty (){      
      return this.$store.state.stlUploadModel.meshProperty
    },
  },
  watch: {
    userUploadFile(val){      
      if(val){
        this.addUserStlModel(val)
      }      
    },
    stlDemoModelMeshProperty(val){      
      this.setupDemoModelMeshProperty(val)
    },
    stlUploadModelMeshProperty(val){    
      this.setupUploadModelMeshProperty(val)
    }
  },
  mounted() {  
    this.loadingDemoModel()    
  }
}

</script>

<style>
#scene3d {
  width: 100%;
  height: 100%;
}
</style>
