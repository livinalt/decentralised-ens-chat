import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

export const SUPPORTED_CHAIN = 11155111;
// export const SUPPORTED_CHAIN = 80001 ;

// 2. Set chains
const sepolia = {
    chainId: SUPPORTED_CHAIN,
    name: 'sepolia',
    currency: 'sETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: import.meta.env.VITE_RPC_URL //get this from infura/alchemu or any provider
  }
  
  // 3. Create modal
  const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
  }
  
  export const configureWeb3Modal = () => 
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [sepolia],
        projectId: import.meta.env.VITE_projectId,
        enableAnalytics: false // Optional - defaults to your Cloud configuration
      })
  
  
