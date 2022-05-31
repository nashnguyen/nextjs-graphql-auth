import type { FunctionComponent } from 'react';

import { useUsersQuery } from './operations.gen';

const UserList: FunctionComponent = () => {
  const [result] = useUsersQuery();
  const { data } = result;

  return (
    <ul>
      {data?.users?.map(item => (
        <li key={item.id}>
          {item.id} - {item.username}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
