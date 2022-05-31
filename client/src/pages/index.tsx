import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'next';

import { Layout } from '@features/shared';
import {
  useNewUserSubscription,
  useUsersQuery
} from '@graphql/generrated/graphql';

const Index: NextPageWithLayout = () => {
  const [usersResult] = useUsersQuery();
  const [newUserResult] = useNewUserSubscription();
  const [newUserList, setNewUserList] = useState(Array);

  useEffect(() => {
    setNewUserList([...newUserList, newUserResult.data?.newUser]);
  }, [newUserResult]);

  if (usersResult.fetching || newUserResult.fetching)
    return <h3>Loading ....</h3>;
  if (usersResult.error || newUserResult.error)
    return (
      <p className='font-bold text-red-500'>
        {usersResult.error?.message} {newUserResult.error?.message}
      </p>
    );

  return (
    <ul>
      {usersResult?.data?.users?.map(item => (
        <li key={item?.id}>
          {item?.id} - {item?.username} <br />
        </li>
      ))}
      {/* {newUserList.map(item => (
        <li key={item?.id}>
          {item?.id} - {item?.username} <br />
        </li>
      ))} */}
    </ul>
  );
};

export default Index;

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
