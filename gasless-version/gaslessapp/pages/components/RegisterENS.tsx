// import { useState } from 'react';
// import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
// import { Biconomy } from "@biconomy/mexa";

const RegisterENS = () => {
  // const [domainName, setDomainName] = useState('');
  // const [avatarURI, setAvatarURI] = useState('');
  // const [selectedFile, setSelectedFile] = useState();

  // const { chainId, walletProvider } = useWeb3ModalAccount();
  // const { connectToInjected, connectToWalletConnect } = useWeb3ModalProvider();

  // const biconomy = new Biconomy(walletProvider, { apiKey: 'your-api-key' });

  // const changeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleSubmission = async () => {
  //   try {
  //     // Your Pinata upload logic remains the same
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleRegisterDomain = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await connectToInjected();
  //     await connectToWalletConnect();

  //     const contract = ensContract.connect(biconomy.getSigner());

  //     // Call smart contract function to register domain
  //     await contract.registerNameService(domainName, avatarURI);
  //     alert('Domain registered successfully!');
  //   } catch (error) {
  //     console.error('Error registering domain:', error.message);
  //   }
  

  return (
    <div>
      <form>
        <div className="">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain name</label>
            <input
              type="text"
              id="domain-name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter domain name"
              required
            />
          </div>

          <br />
       
          <label className="form-label">Choose File To Upload</label>
          <br />
          <input
            type="file"
            // onChange={}
            className='border outline-0  text-blue-800 p-10'
          />
          <br />
         
          <div className='p-4'>
          
            
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterENS;
