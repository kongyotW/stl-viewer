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
      progress_All : {
        value : 0, 
        loading : true,
        size : window.innerWidth/4
      },        
      chk_auto_rotate : true,
      mesh_demo : null,
      plate_R : {
        name : 'Dragon',
        url: 'static/models/stl/Dragon.STL',        
        visible : true,
        auto_rotate : true,
        size : '',
        loading : 'true',
        progress_load_value : 0
      },          
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
      addStlFile: function(fileList){        
        var reader = new FileReader()
        var _this = this
        reader.onload = function (e) {          
          var STLLoader = require('three-stl-loader')(THREE)
          var loader = new STLLoader()
          var geometry = loader.parse(e.target.result)          
          var material = new THREE.MeshLambertMaterial()
          var mesh = new THREE.Mesh( geometry, material )          
          _this.scene.add(mesh)
        }
        reader.readAsArrayBuffer(fileList[0])
      },
      initScene: function() {            
        console.log('initScene...')
        this.container = document.getElementById("scene3d")
        let padding = 24       
        this.CANVAS_WIDTH = this.container.clientWidth
        this.CANVAS_HEIGHT = window.innerHeight - (padding*2)

        this.camera = new THREE.PerspectiveCamera(100, this.CANVAS_WIDTH / this.CANVAS_HEIGHT, 1, 1500);            
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0x5E5EBB)                

        //Set Mesh To Center
        var box = new THREE.Box3().setFromObject( this.mesh_demo );
        box.center(  this.mesh_demo.position ); // this re-sets the mesh position
        this.mesh_demo.position.multiplyScalar( - 1 );       

        //Grouping Mesh
        var obj3DCombine = new THREE.Object3D();
        obj3DCombine.add( this.mesh_demo );
        
        //Add Group to pivot for rotation aroud themself
        this.pivot = new THREE.Group();
        this.scene.add( this.pivot  );
        this.pivot.add( obj3DCombine);

        // Lights
        // White directional light at half intensity shining from the top.
        this.directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        this.scene.add( this.directionalLight );
    
        // renderer
        var canvas = document.getElementById("canvas3d")
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas })
        this.renderer.setPixelRatio(window.devicePixelRatio)    
        this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT);           
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;

        var OrbitControls = require('three-orbit-controls')(THREE)        
        this.controls = new OrbitControls( this.camera, canvas )        
                
        // this.camera.position.set(0, 0, 200)                 
        this.camera.position.set(-0.08335522236302186, -330.7635620041993, 31.27798477519234)
        // this.cameraTarget = new THREE.Vector3(0, 0, 0);
        this.controls.update()
        window.addEventListener('resize', this.onWindowResize, false)           
    },
    loadingModel: function(){
      var _this = this
      var manager = new THREE.LoadingManager()
      manager.onStart = function ( ) {}
      manager.onLoad = function ( ) {
        // _this.plate_R.loading = false        
        // _this.progress_All.loading = false   

        _this.initScene();
        _this.animate()
      }
      manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )                        
        _this.progress_All.value = ( _this.plate_R.progress_load_value)        
      }
      manager.onError = function (  ) {
        window.alert("Load model error!, Please refresh this page.")        
      }
      
      var STLLoader = require('three-stl-loader')(THREE)
      var loaderDemo = new STLLoader(manager)
      loaderDemo.load(this.$store.state.stlDemoModel.url, function (geometry) { 
        console.log('loaderDemo complete!')            
          // geometry.center()
        var material = new THREE.MeshLambertMaterial()
        material.color.setHex( 0xfeece1 )

        _this.mesh_demo = new THREE.Mesh(geometry, material)
        
        _this.$store.commit('SET_STL_DEMO_MODEL_LOAD_COMPLETE')           

        _this.mesh_demo.scale.set(1, 1, 1)  
        var boundingBox = new THREE.Box3().setFromObject(_this.mesh_demo)
        var size = new THREE.Vector3()
        _this.plate_R.size = boundingBox.getSize(size)                 
      }, this.loadingWacther_R)
      
    },      
    loadingWacther_R: function (xhr){            
      var progress_load_value = Math.round(xhr.loaded / xhr.total * 100)
      this.$store.commit('SET_STL_DEMO_MODEL_LOAD_PROGRESS', {progress_load_value : progress_load_value})     
    },    
    loadingError: function ( ){      
        window.alert("Load model error!, Please refresh this page!")        
    },
    onWindowResize: function () {        
      let padding = 24
      this.CANVAS_WIDTH = this.container.clientWidth
      this.CANVAS_HEIGHT = window.innerHeight - (padding*2)
      this.camera.aspect = this.CANVAS_WIDTH / this.CANVAS_HEIGHT
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
    },
    animate: function() {
      requestAnimationFrame(this.animate)                
      this.controls.update()   
      this.render()
      // console.log(this.camera.position.x + ', '+ this.camera.position.y + ', ' + this.camera.position.z)      
    },
    render: function () {           
      if(this.mesh_demo != null){
        if(this.chk_auto_rotate) this.pivot.rotation.z += 0.02;
      }       
      this.directionalLight.position.copy( this.camera.position ) //JUST what light follow camera
      // this.camera.lookAt(this.cameraTarget)
      this.renderer.render(this.scene, this.camera)
    },
    setupProperty(property){        
      if(property.name === this.plate_R.name){
         this.mesh_demo.visible =  property.visible
         this.mesh_demo.material.color.setHex(property.color)     
      }
    }
  },
  computed: {
    stlfile () {
      console.log('compute me...[stlfile]')
      return this.$store.state.stlfile
    },
    stlDemoModel : function () {      
      return this.$store.state.stlDemoModel
    },    
  },
  watch: {
    stlfile(val){      
      if(val){
        this.addStlFile(val)
      }      
    }
  },
  mounted() {  
    this.loadingModel()    
  }
}

</script>

<style>
#scene3d {
  width: 100%;
  height: 100%;
}
</style>
