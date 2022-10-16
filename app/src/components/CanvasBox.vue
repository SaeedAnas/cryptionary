<template>
  <div class="canvas">
     <VueDrawingCanvas :style="{border:'1px solid'}"/>
     <div>
        <h3>Type your Answer</h3>
         <input v-model="text"/>
         <button @click="submit()">POST</button>
       </div>
  </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";

export default {
  name: 'CanvasBox',
   components: {
    VueDrawingCanvas
  },
  props: {
    msg: String
  },
  data(){
    return{
        text:''
    }
  },
  methods:{
    submit(){
        console.log("submit", this.text)
    }
  },
}
</script>

<style>
.canvas{
    width: 100%;
    display: flex;
    justify-content: center ;
}
</style>
