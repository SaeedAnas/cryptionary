import { createApp } from 'vue'
import App from './App.vue'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { initWallet } from 'solana-wallets-vue'
import 'solana-wallets-vue/styles.css'
import { initWorkspace } from '@/composables'

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
]

initWallet({ wallets, autoConnect: true })
initWorkspace()
createApp(App).mount('#app')
