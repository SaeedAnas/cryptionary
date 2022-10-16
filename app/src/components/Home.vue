<template>
  <div class="cr-home">
    <div class="cr-home--header">
      <WalletMultiButton/>
    </div>
    <div class="cr-home--body">
      <CanvasBox/>
      <CanvasList/>
    </div>
  </div>
</template>

<script>
import { WalletMultiButton } from 'solana-wallets-vue'

import CanvasBox from './CanvasBox.vue';
import CanvasList from "./CanvasList.vue";

export default {
  name: 'HelloWorld',
   components: {
    CanvasBox,
    CanvasList,
    WalletMultiButton
  },
  props: {
    msg: String
  }
}
</script>

<style>
.cr-home{
  width: 100%;
  height: 100%;
}

.cr-home--header{
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: end;
    padding:0 20px;
    border-bottom: 1px solid lightskyblue;
    background: rgb(228, 243, 248);
}
/* .cr-home--body{
    height: calc(100%-7rem);
} */
</style>
