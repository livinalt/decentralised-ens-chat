import { useState, useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { getEnsContract } from '../constants/contracts';
import { getProvider } from "../constants/providers";

const UpdateDetails = ({ ensContract }) => {
  const [domainName, setDomainName] = useState('');
  const [avatarURI, setAvatarURI] = useState('');
  const [currentAvatarURI, setCurrentAvatarURI] = useState('');

  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    
  }, [domainName]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getEnsContract(signer);

    try {

      await contract.updateDomainAvatar(domainName, avatarURI);
      alert('Domain details updated successfully!');
    }
    catch (error) {
      console.error('Error updating domain details:', error.message);
    }
  };

  const handlePreSubmission = () => {
   
  };

  return (
    <div>
      <form onSubmit={handleUpdateDetails}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="domain-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Domain name</label>
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
          <div>
            <label htmlFor="avatar-uri" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar URI</label>
            <input
              type="text"
              id="avatar-uri"
              value={avatarURI}
              onChange={(e) => setAvatarURI(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter avatar URI"
              required
            />
          </div>
          <div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input id="agree-terms" type="checkbox" 
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
              </div>
              <label htmlFor="agree-terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
            </div>
            <button
              type="submit"
              onClick={handlePreSubmission}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateDetails;
