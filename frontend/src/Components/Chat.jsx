import React, { useState, useEffect } from 'react';
import { configureWeb3Modal } from "./connection";
import { ethers } from 'ethers';
// import ChatDappContract from './contracts/ChatDapp.json';

configureWeb3Modal();

function Chat() {
  const [web3Modal, setWeb3Modal] = useState(null);
  const [provider, setProvider] = useState(null);
  const [chatContract, setChatContract] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initWeb3Modal = async () => {
      const web3ModalInstance = new Web3Modal();
      setWeb3Modal(web3ModalInstance);
    };
    initWeb3Modal();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      setProvider(new ethers.providers.Web3Provider(provider));

      // Initialize contract
      const contractAddress = 'CONTRACT_ADDRESS'; // Replace with your deployed contract address
      const chatContractInstance = new ethers.Contract(contractAddress, ChatDappContract.abi, provider);
      setChatContract(chatContractInstance);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const tx = await chatContract.sendMessage(receiver, message);
      await tx.wait();
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      // Fetch messages based on receiver
      const fetchedMessages = await chatContract.getMessages(provider.getSigner().getAddress(), receiver);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (provider && chatContract && receiver) {
      fetchMessages();
    }
  }, [provider, chatContract, receiver]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {!provider ? (
        <button onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect Wallet
        </button>
      ) : (
        <>
          <div className="flex justify-between w-full mb-4">
            <input
              type="text"
              placeholder="Receiver Address"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="p-2 border border-gray-300 rounded mr-2"
            />
            <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send
            </button>
          </div>
          <div className="h-96 overflow-y-auto w-full border border-gray-300 p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <p><span className="font-semibold">{msg.sender}</span>: {msg.content}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full mt-4"
          />
        </>
      )}
    </div>
  );
}

export default Chat;
