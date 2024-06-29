import { Container } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NewQuote } from './pages/NewQuote/NewQuote';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <Container size={'3'}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quotes/:quoteId' element={<Home />} />
        <Route path='/new-quote' element={<NewQuote />} />
      </Routes>
    </Container>
  );
};
