import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'next';

import { Layout } from '@features/shared';
import {
  useUsersQuery,
  useNewUserSubscription
} from '@graphql/generrated/graphql';

const Index: NextPageWithLayout = () => {
  const [usersResult] = useUsersQuery();
  const [newUserResult] = useNewUserSubscription();

  if (usersResult.fetching || newUserResult.fetching)
    return <h3>Loading ....</h3>;
  if (usersResult.error || newUserResult.error)
    return (
      <p className='font-bold text-red-500'>
        {usersResult.error?.message} {newUserResult.error?.message}
      </p>
    );

  return (
    <>
      {usersResult.data?.users?.map(item => (
        <span>
          {item?.id} - {item?.username} <br />
        </span>
      ))}
      <span>
        {newUserResult.data?.newUser?.id} -
        {newUserResult.data?.newUser?.username}
      </span>
    </>
  );
};

export default Index;

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
