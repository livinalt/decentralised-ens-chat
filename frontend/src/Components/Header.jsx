import '@radix-ui/themes/styles.css';
import { Avatar, Flex, Text } from '@radix-ui/themes'
import PhoenixLogo from '../assets/phoenix-logo.jpg'


const Header = () => {

  return (
    <div className='flex justify-between items-center pt-4 mx-3'>
      <div>
        <Avatar
            size="5"
            src= {PhoenixLogo}
            fallback="A"
            className='w-50%'
          />
          <Text className='text-sm font-bold px-4 text-blue-800'>ENS DAPP</Text>
      </div>

      <Flex justify={"between"}>
      
        <w3m-button />
      </Flex>
    </div>
  )
}

export default Header