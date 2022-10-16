<template>
  <div class="canvas">
     <VueDrawingCanvas :style="{border:'1px solid'}" ref="canvas" v-model:image="image"/>
     <div>
        <h3>Type your Answer</h3>
         <input v-model="text"/>
         <button @click="submit()">POST</button>
       </div>
  </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";
import {create} from "ipfs-http-client"
import { useWorkspace } from '@/composables'
import { web3 } from '@project-serum/anchor'


const sendPost = async (guess, hash) => {
  const { wallet, program } = useWorkspace()
  const signature = await program.provider.connection.requestAirdrop(
      wallet.value.publicKey,
      1000000000
    );
    await program.provider.connection.confirmTransaction(signature);
  
  // 2. Generate a new Keypair for our new tweet account.
  const post = web3.Keypair.generate()

  // 3. Send a "SendTweet" instruction with the right data and the right accounts.
  await program.value.rpc.sendPost(guess, hash, {
      accounts: {
          author: wallet.value.publicKey,
          post: post.publicKey,
          systemProgram: web3.SystemProgram.programId,
      },
      signers: [post]
  })

  // 4. Fetch the newly created account from the blockchain.
  const posts = await program.value.account.post.fetch(post.publicKey)
  console.log(posts)
}


const ipfsConfig = {
  host: "127.0.0.1",
  port: 5001,
  protocol: "http"
}

const ipfs = create(ipfsConfig)

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
        image: '',
        text:''
    }
  },
  methods:{
    async submit(){
        console.log("submit", this.text)
        console.log(this.$refs.canvas)
        console.log(this.$refs.image)
        const img =this.$refs.canvas.getImage()
        const imghash = await ipfs.add(img);
        console.log(imghash)
        await sendPost(this.text, imghash)


    },
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
