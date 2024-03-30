import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Box, Card, Flex, Text, TextArea } from '@radix-ui/themes';
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getEnsContract, getChatContract } from '../constants/contracts';
import { getProvider } from '../constants/providers';

const ChatUI = () => {
    const [messageText, setMessageText] = useState("");
    const { address } = useWeb3ModalAccount();
    const { domainName } = useParams();
    const [initialDomainName, setInitialDomainName] = useState('');
    const [domainOwner, setDomainOwner] = useState('');
    const [avatar, setAvatar] = useState('');
    const [sender, setSender] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch domain details
        const getDomainDetails = async () => {
            if (!address) return;

            const ensContract = getEnsContract(getProvider);
            const [name, avatarHash, owner] = await ensContract.domains(address);

            setInitialDomainName(name);
            setDomainOwner(owner);
            setAvatar(avatarHash);
        };

        // Fetch messages
        const getMessages = async () => {
            const chat = getChatContract(getProvider);
            const ensNameSevice = getEnsContract(getProvider);

            const senderName = await ensNameSevice.domains(address);
            setSender(senderName[0]);

            const history = await chat.getMessages(sender, domainName);
            console.log("History", history);
            setMessages(history);
        };

        getDomainDetails();
        getMessages();
    }, [address, domainName]);

    const sendMessage = async () => {
        if (!messageText) return; // Do not send empty messages

        try {
            const chat = getChatContract(getProvider);
            await chat.sendMessage(domainOwner, messageText);

            // After sending the message, fetch the updated messages
            const history = await chat.getMessages(sender, domainName);
            setMessages(history);

            // Clear the message input
            setMessageText("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            <Text as="div" weight="bold" className="text-xl">Chat with {initialDomainName}</Text>
            <Flex justify={"between"}>
                <TextArea placeholder="Send message..."
                    size={"3"}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <Button onClick={sendMessage}>Send</Button>
            </Flex>
            {/* Display messages */}
            {messages.map((message, index) => (
                <Box key={index} width="800px">
                    <Card size="2">
                        <Flex gap="4" align="center">
                            <Avatar
                                src={import.meta.env.VITE_ipfs_base_url + avatar}
                                size="4" radius="full" fallback="T" color="indigo" />
                            <Box>
                                <Text as="div" weight="bold">
                                    {message.sender}
                                </Text>
                                <Text as="div" color="gray">
                                    {message.content}
                                </Text>
                            </Box>
                        </Flex>
                    </Card>
                </Box>
            ))}
        </>
    )
}

export default ChatUI;
