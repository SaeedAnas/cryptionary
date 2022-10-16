<template>
  <div class="canvas-list">
     <div v-for="(item, index) in list" :key="index" class="canvas-list-item">
        <img :src="item.url"/>
       <div>
        <h3>Type your Answer</h3>
         <input v-model="item.typeText"/>
         <button @click="handleCheck(item, index)">Check</button>
       </div>
       <div :style="{display:'flex', alignItems:'center'}">
        <h3>Total wrong Guesses</h3>
         <div :style="{marginLeft:'10px', color:'red', fontSize:'20px'}">{{item.wrongGuesses}}</div>
       </div>
     </div>
  </div>
</template>

<script>

export default {
  name: 'CanvasList',
   components: {
    
  },
  props: {
    msg: String
  },
  methods:{
    handleCheck(item, index){
        console.log(item, index)
    }
  },
  data(){
    return{
        list : [
            {url:'http://127.0.0.1:8080/ipfs/QmQ81NTDioa97su74CnCr4Bvoy9iqxb3CVALhQQs1R2CDZ', typeText:'', originalText:'', wrongGuesses:0},
        ]
    }
  }
}
</script>

<style>
.canvas-list{
    width: 80%;
    margin: 0 auto;
}

.canvas-list-item{
    border: 1px solid blue;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    border-radius: 20px;
}

.canvas-list-item img{
    width: 500px;
    height: 200px;
}
</style>
