import { useState } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider,} from "@web3modal/ethers/react";
import { getEnsContract } from '../constants/contracts';
import { getProvider } from "../constants/providers";


const GetDomain = ({ ensContract }) => {
  const [domainName, setDomainName] = useState('');
  const [domainDetails, setDomainDetails] = useState({ name: '', avatarURI: '', owner: '' });

  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const handleGetDomain = async (e) => {
    e.preventDefault();

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

        const contract = getEnsContract(signer);
    try {
      // Call smart contract function to get domain details
      const details = await contract.getDomainDetails(domainName);
      setDomainDetails({ name: details[0], avatarURI: details[1], owner: details[2] });
    
    } catch (error) {
      console.error('Error retrieving domain details:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleGetDomain}>
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
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Retrieve Name Service
            </button>
          </div>
        </div>
      </form>
      <div>
        <p className="text-gray-500 dark:text-gray-400">Domain Name : {domainDetails.name}</p>
        <p className="text-gray-500 dark:text-gray-400">Avatar URI : {domainDetails.avatarURI}</p>
        <p className="text-gray-500 dark:text-gray-400">Owner : {domainDetails.owner}</p>
      </div>
    </div>
  );
};

export default GetDomain;
