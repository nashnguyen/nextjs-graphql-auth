import { FunctionComponent, useEffect, useState } from 'react';

import { useUsersQuery, useNewUserSubscription } from './operations.gen';

const UserList: FunctionComponent = () => {
  const [users, setUsers] =
    useState<Array<{ id: string; username: string }>>(Array);
  const [usersResult] = useUsersQuery();
  const [newUserResult] = useNewUserSubscription();

  useEffect(() => {
    if (!usersResult.fetching && usersResult.data)
      setUsers(usersResult.data.users);
  }, [usersResult]);

  useEffect(() => {
    if (!newUserResult.fetching && newUserResult.data)
      setUsers([...users, newUserResult.data.newUser]);
  }, [newUserResult]);

  if (users.length === 0)
    return (
      <span>
        Please{' '}
        <a
          href='/auth'
          className='cursor-pointer font-bold text-indigo-600 hover:text-indigo-500'
        >
          Sign in
        </a>{' '}
        to view user-list
      </span>
    );
  return (
    <ul>
      {users.map(item => (
        <li key={item.id}>
          {item.id} - {item.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
