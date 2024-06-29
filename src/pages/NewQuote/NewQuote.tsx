import React, { useState } from 'react';
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Separator,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { MagicWandIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { ApiQuote, Quote } from '../../types';
import { axiosApi } from '../../axiosApi';
import { faker } from '@faker-js/faker';

const initialState: Quote = {
  category: 'none',
  author: '',
  quoteText: '',
};

export const NewQuote = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<Quote>(initialState);

  const navigate = useNavigate();

  const onFieldChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axiosApi.post<ApiQuote>('quotes.json', values);
    } catch (error) {
      console.log(error);
    } finally {
      setValues(initialState);
      setIsLoading(false);
      navigate('/');
    }
  };

  const randomCategory = () => {
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
    setValues({
      author: faker.person.fullName(),
      quoteText: faker.lorem.paragraph(),
      category: randomCategory(),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Card mt={'3'}>
        <Flex justify={'between'} align={'center'} pr={'2'}>
          <Heading weight={'medium'} size={'4'}>
            Create a new quote
          </Heading>

          <Flex gap={'5'} align={'center'}>
            <Button
              variant={'ghost'}
              type={'button'}
              onClick={() => randomValues()}
            >
              Random values
              <MagicWandIcon />
            </Button>

            <Link to={'/'}>
              <Button variant={'ghost'} color={'red'} type={'button'}>
                Cancel
                <MagicWandIcon />
              </Button>
            </Link>
          </Flex>
        </Flex>

        <Separator size={'4'} my={'2'} />

        <Flex align={'start'} mb={'3'} direction={'column'}>
          <Text color={'gray'} size={'2'}>
            Category
          </Text>
          <Select.Root name={'category'} value={values.category}>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Category</Select.Label>
                <Select.Item value='none'>Select</Select.Item>
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
          onChange={onFormSubmit}
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
