import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Separator,
  Spinner,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { Cross2Icon, MagicWandIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ApiQuote, Quote } from '../../types';
import { axiosApi } from '../../axiosApi';
import { faker } from '@faker-js/faker';
import { enqueueSnackbar } from 'notistack';

export const NewQuote = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState('star-wars');
  const [values, setValues] = useState<Quote>({
    category,
    author: '',
    quoteText: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (params.quoteId) {
        const response = await axiosApi.get<Quote>(
          `quotes/${params.quoteId}.json`
        );
        if (response.data) {
          setValues(response.data);
          setCategory(response.data.category);
        }
      }
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong!' });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [params.quoteId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const onFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const onCategoryChange = (value: string) => {
    setCategory(value);
    setValues((prevState) => ({ ...prevState, category: value }));
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (params.quoteId) {
        await axiosApi.put(`quotes/${params.quoteId}.json`, values);
      } else {
        await axiosApi.post<ApiQuote>('quotes.json', values);
      }
    } catch (error) {
      enqueueSnackbar({ variant: 'error', message: 'Something went wrong!' });
    } finally {
      setValues({
        category: '',
        author: '',
        quoteText: '',
      });
      setIsLoading(false);
      navigate('/');
    }
  };

  const randomCategories = () => {
    const categories = [
      'star-wars',
      'famous-people',
      'saying',
      'humour',
      'motivational',
    ];

    return categories[Math.floor(Math.random() * categories.length)];
  };

  const randomValues = () => {
    const randomCategory = randomCategories();
    setValues({
      author: faker.person.fullName(),
      quoteText: faker.lorem.paragraph(),
      category: randomCategory,
    });
    setCategory(randomCategory);
  };

  return isLoading ? (
    <Spinner className={'spinner'} />
  ) : (
    <form onSubmit={onFormSubmit}>
      <Card>
        <Flex justify={'between'} align={'center'} pr={'2'}>
          <Heading weight={'medium'} size={'4'}>
            Create a new quote
          </Heading>

          <Flex gap={'5'} align={'center'}>
            <Button variant={'ghost'} type={'button'} onClick={randomValues}>
              Random values
              <MagicWandIcon />
            </Button>

            <Link to={'/'}>
              <Button variant={'ghost'} color={'red'} type={'button'}>
                Cancel
                <Cross2Icon />
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Separator size={'4'} my={'2'} />

        <Flex align={'start'} mb={'3'} direction={'column'}>
          <Text color={'gray'} size={'2'}>
            Category
          </Text>
          <Select.Root
            name='category'
            value={category}
            onValueChange={onCategoryChange}
            required
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Category</Select.Label>
                <Select.Item value='star-wars'>Star Wars</Select.Item>
                <Select.Item value='famous-people'>Famous people</Select.Item>
                <Select.Item value='saying'>Saying</Select.Item>
                <Select.Item value='humour'>Humour</Select.Item>
                <Select.Item value='motivational'>Motivational</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Text color={'gray'} size={'2'}>
          Author
        </Text>
        <TextField.Root
          placeholder='Author…'
          mb={'3'}
          name={'author'}
          value={values.author}
          onChange={onFieldChange}
          required
        >
          <TextField.Slot>
            <PersonIcon height='16' width='16' />
          </TextField.Slot>
        </TextField.Root>

        <Text color={'gray'} size={'2'}>
          Quote text
        </Text>
        <TextArea
          rows={5}
          placeholder='Enter quote text…'
          mb={'3'}
          name={'quoteText'}
          onChange={onFieldChange}
          value={values.quoteText}
          required
        />

        <Button
          type={'submit'}
          style={{ width: '100%' }}
          variant={'surface'}
          disabled={isLoading}
          loading={isLoading}
        >
          Save
        </Button>
      </Card>
    </form>
  );
};
