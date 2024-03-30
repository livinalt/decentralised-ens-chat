import '@radix-ui/themes/styles.css';
import { Avatar, Flex, Text } from '@radix-ui/themes'
import PhoenixLogo from '../assets/phoenix-logo.jpg'


const Header = () => {

  return (
    <div className='flex justify-between items-center'>
      <div>
        <Avatar
            size="5"
            src= {PhoenixLogo}
            fallback="A"
          />
          <Text>ENS DAPP</Text>
      </div>

      <Flex justify={"between"}>
      
        <w3m-button />
      </Flex>
    </div>
  )
}

export default Header