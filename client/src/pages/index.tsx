import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'next';

import { Layout } from '@features/shared';
import { useUsersQuery } from '@graphql/generrated/graphql';

const Index: NextPageWithLayout = () => {
  const [usersResult, _] = useUsersQuery();
  const { data, fetching, error } = usersResult;

  if (fetching) return <h3>Loading ....</h3>;
  if (error) return <p className='font-bold text-red-500'>{error.message}</p>;

  return (
    <>
      {data?.users?.map(item => (
        <span>
          {item?.id} - {item?.username}
        </span>
      ))}
    </>
  );
};

export default Index;

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
