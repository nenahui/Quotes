import { Flex, Heading, TabNav, Text } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, PlusCircledIcon } from '@radix-ui/react-icons';

export const Header = () => {
  return (
    <header>
      <Flex justify={'between'} align={'center'}>
        <Link to={'/'} className={'logo'}>
          <Heading size={'5'}>Quotes</Heading>
        </Link>

        <nav>
          <TabNav.Root>
            <TabNav.Link asChild>
              <NavLink to={'/'}>
                <HomeIcon />
                <Text ml={'1'}>Home</Text>
              </NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/new-quote'}>
                <PlusCircledIcon />
                <Text ml={'1'}>New Quote</Text>
              </NavLink>
            </TabNav.Link>
          </TabNav.Root>
        </nav>
      </Flex>
    </header>
  );
};
