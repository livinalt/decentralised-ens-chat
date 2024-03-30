import React from 'react'
import Header from './Components/Header'
import { configureWeb3Modal } from './connection';
import RegisterENS from './Components/RegisterENS';
import GetDomain from './Components/GetDomain';
import UpdateDetails from './Components/UpdateDetails';
import Submission from './Components/Submission';
import { Box, Tabs, Text } from '@radix-ui/themes';
import ChatUI from './Components/ChatUI';
import Hero from './Components/Hero';

configureWeb3Modal();

const App = () => {
  return (
    <div>

<Header />
<Hero />

<Tabs.Root defaultValue="account">
  <Tabs.List>
    <Tabs.Trigger value="upload">Upload</Tabs.Trigger>
    <Tabs.Trigger value="register">Register ENS</Tabs.Trigger>
    <Tabs.Trigger value="getDomain">Get Domain</Tabs.Trigger>
    <Tabs.Trigger value="update">Update Info</Tabs.Trigger>
    <Tabs.Trigger value="chat">Chat Section</Tabs.Trigger>
  </Tabs.List>

  <Box pt="3">
    <Tabs.Content value="upload">
        <Submission />
    </Tabs.Content>

    <Tabs.Content value="register">
       <RegisterENS />
    </Tabs.Content>

    <Tabs.Content value="getDomain">
       <GetDomain />
    </Tabs.Content>
    
    <Tabs.Content value="update">
        <UpdateDetails />
    </Tabs.Content>
    
    <Tabs.Content value="chat">
        <ChatUI />
    </Tabs.Content>
  </Box>
</Tabs.Root>  
           
      
    </div>
  )
}

export default App