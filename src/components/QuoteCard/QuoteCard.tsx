import React from 'react';
import {
  Text,
  Button,
  Card,
  Flex,
  Box,
  Separator,
  Heading,
} from '@radix-ui/themes';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { ApiQuote } from '../../types';

interface Props {
  quote: ApiQuote;
  onDelete: (id: string) => void;
}

export const QuoteCard: React.FC<Props> = ({ quote, onDelete }) => {
  return (
    <Card>
      <Box>
        <Flex gap={'5'} justify={'between'}>
          <Heading weight={'medium'} size={'4'}>
            {quote.author}
          </Heading>
          <Flex gap={'5'}>
            <Button variant={'ghost'}>
              Edit
              <Pencil2Icon />
            </Button>
            <Button
              variant={'ghost'}
              color={'red'}
              onClick={() => onDelete(quote.id)}
            >
              Delete
              <TrashIcon />
            </Button>
          </Flex>
        </Flex>

        <Separator size={'4'} my={'1'} />

        <Text size={'2'}>{quote.quoteText}</Text>
      </Box>
    </Card>
  );
};
