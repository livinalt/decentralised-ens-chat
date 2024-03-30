import { useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getEnsContract } from '../constants/contracts';
import { getProvider } from "../constants/providers";

// const ensContract = getEnsContract;

const RegisterENS = ({ ensContract }) => {
  const [domainName, setDomainName] = useState('');
  const [avatarURI, setAvatarURI] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState("");

  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();

      setAvatarURI(`https://coffee-blank-owl-368.mypinata.cloud/ipfs/${resData.IpfsHash}`);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterDomain = async (e) => {
    e.preventDefault();

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getEnsContract(signer);

    try {
      // Call smart contract function to register domain
      await contract.registerNameService(domainName, avatarURI);
      alert('Domain registered successfully!');
    } catch (error) {
      console.error('Error registering domain:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegisterDomain}>
        <div className="">
          <div>
            <label name="domain-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain name</label>
            <input
              type="text"
              id="domain-name"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
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
         onChange={changeHandler}
         className='border outline-0  text-blue-800 p-10'
       />
       <br />

       <div className='p-4'>
       <div className="flex items-start mb-6">
         <div className="flex items-center h-5">
           <input id="agree-terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
         </div>
         <label htmlFor="agree-terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
       </div>
       <br />
         
      <button
         type="submit"
         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         onClick={handleSubmission}
          >
         Register Name Service
        </button>
       </div>
      </div>
     </form>
    </div>
  );
};

export default RegisterENS;
