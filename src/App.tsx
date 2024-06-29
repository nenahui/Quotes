import { Container } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NewQuote } from './pages/NewQuote/NewQuote';

export const App = () => {
  return (
    <Container size={'2'}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new-quote' element={<NewQuote />} />
      </Routes>
    </Container>
  );
};
