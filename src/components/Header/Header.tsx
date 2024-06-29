import { Flex, Heading, TabNav } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';

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
              <NavLink to={'/'}>Home</NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/new-quote'}>New Quote</NavLink>
            </TabNav.Link>
          </TabNav.Root>
        </nav>
      </Flex>
    </header>
  );
};
