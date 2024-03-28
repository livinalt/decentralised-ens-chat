import '@radix-ui/themes/styles.css';
import { Avatar, Flex, Text } from '@radix-ui/themes'


const Header = () => {

  return (
    <div className='flex justify-between items-center'>
      <div>
        <Avatar
            size="5"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
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