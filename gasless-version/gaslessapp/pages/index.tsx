import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
// import {Header} from "./Header";
import PhoenixLogo from "../assets/phoenix-logo.jpg"
import RegisterENS from "./components/RegisterENS";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <section>
          <div className='flex justify-between items-center pt-4 mx-3'>
          <div className="flex justify-between align-middle">
            <p className='text-sm font-bold px-4 text-blue-800'>ENS DAPP</p>    
            <ConnectWallet />
          </div>
        </div>
      </section>

      <section>
      <div>
        <h1 className='text-center font-extrabold text-5xl w-3/5 ml-80 pt-20  text-blue-800'>Welcome To Your Decentralised Storage Gateway</h1>
        <p className='text-center font-medium text-2xl w-3/5 ml-80 p-10'>Secure Your onchain names and storage with our unique storage service </p>
    </div>
      </section>
      <section>
       
      </section>
      <section>
        <Web3Button 
        contractAddress="0xF68F998BdC7372d0d68Deb4D38d87D3E8A6cAF14"
        action={(contract) => contract.call}>Retrieve Details
        </Web3Button>
      </section>

      <section>
        <RegisterENS />
        <Web3Button 
        contractAddress="0xF68F998BdC7372d0d68Deb4D38d87D3E8A6cAF14"
        action={(contract) => contract.call}>Register Name
        </Web3Button>
      </section>
    </main>
  );
};

export default Home;
