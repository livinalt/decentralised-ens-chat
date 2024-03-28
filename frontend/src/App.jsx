import React from 'react'
import Header from './Components/Header'
import { configureWeb3Modal } from './connection';
import RegisterENS from './Components/RegisterENS';
import GetDomain from './Components/GetDomain';
import UpdateDetails from './Components/UpdateDetails';
import Submission from './Components/Submission';

configureWeb3Modal();

const App = () => {
  return (
    <div>
      <Header />
      {/* <Submission /> */}
      <RegisterENS />
      <GetDomain />
      <UpdateDetails />
    </div>
  )
}

export default App