import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface Props {
  data: Category;
}

export const Sidebar: React.FC<Props> = ({ data }) => {
  return (
    <Link
      className={'clean-link'}
      to={data.id === '' ? '/' : `/quotes/${data.id}`}
    >
      {data.title}
    </Link>
  );
};
