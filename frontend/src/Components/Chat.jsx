import React, { useState, useEffect } from 'react';
import { useWeb3ModalAccount, useWeb3ModalProvider,} from "@web3modal/ethers/react";
import { getChatContract } from '../constants/contracts'; // Import the ChatDapp contract ABI
import { getProvider } from "../constants/providers";
import { ethers } from 'ethers';
import ABI  from '../constants/ChatABI.json'; // Import the ChatDapp contract ABI

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState();

  
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  // Initialize the contract
  useEffect(() => {
    const initContract = async () => {
      try {
        // Connect to Ethereum provider
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();

        // Load contract
        const contractAddress = getChatContract(signer);
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        // Fetch initial messages
        await fetchMessages();
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initContract();
  }, []);

  // Function to fetch messages from the contract
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await contract.getMessages();
      setMessages(fetchedMessages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  // Function to send a new message
  const sendMessage = async () => {
    try {
      setLoading(true);
      await contract.sendMessage(newMessage);
      await fetchMessages(); // Refresh messages after sending
      setNewMessage('');
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Decentralised Chatting App</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={sendMessage} disabled={!provider}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
