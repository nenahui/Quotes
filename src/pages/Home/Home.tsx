import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Flex, Heading, Spinner, Text } from '@radix-ui/themes';
import { QuoteCard } from '../../components/QuoteCard/QuoteCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { ApiQuote, ApiQuotes } from '../../types';
import { axiosApi } from '../../axiosApi';
import { enqueueSnackbar } from 'notistack';

export const Home = () => {
  const params = useParams();
  const data = [
    { title: 'All quotes', id: '' },
    { title: 'Star Wars', id: 'star-wars' },
    { title: 'Famous People', id: 'famous-people' },
    { title: 'Saying', id: 'saying' },
    { title: 'Humour', id: 'humour' },
    { title: 'Motivational', id: 'motivational' },
  ];
  const [quotes, setQuotes] = useState<ApiQuote[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState('');
  const navigate = useNavigate();

  const fetchQuotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setQuotes([]);
      const response = await axiosApi.get<ApiQuotes | null>(
        params.quoteId
          ? `quotes.json?orderBy="category"&equalTo="${params.quoteId}"`
          : 'quotes.json'
      );
      const quotesResponse = response.data;

      if (quotesResponse !== null && quotesResponse) {
        const quotes = Object.keys(quotesResponse).map((id: string) => {
          return {
            ...quotesResponse[id],
            id,
          };
        });

        setQuotes(quotes);
      }

      const currentCategory =
        data.find((category) => category.id === params.quoteId) || data[0];
      setCurrentCategoryTitle(currentCategory.title);
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong!' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [params.quoteId]);

  const deleteQuote = useCallback(
    async (id: string) => {
      await axiosApi.delete(`quotes/${id}.json`);
      navigate('/');
      void fetchQuotes();
    },
    [fetchQuotes, navigate]
  );

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  return (
    <>
      <Flex justify={'between'}>
        <aside>
          <Flex direction={'column'} gap={'1'} align={'start'}>
            {data.map((sidebar) => (
              <Sidebar key={sidebar.id} data={sidebar} />
            ))}
          </Flex>
        </aside>
        {isLoading ? (
          <Flex width={'75%'} justify={'center'} align={'center'}>
            <Spinner className={'spinner'} />
          </Flex>
        ) : (
          <Flex width={'75%'} direction={'column'} gap={'2'}>
            <Heading weight={'medium'} size={'4'}>
              {currentCategoryTitle}
            </Heading>
            {quotes?.length === 0 ? (
              <Text>The list of quotes is empty</Text>
            ) : (
              quotes?.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  onDelete={deleteQuote}
                  quote={quote}
                />
              ))
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};
