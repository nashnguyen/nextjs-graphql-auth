import type { ReactElement } from 'react';

import type { NextPageWithLayout } from 'next';

import Layout from 'shared/layout';
import UserList from 'features/user/user-list';

const Index: NextPageWithLayout = () => {
  return <UserList />;
};

export default Index;

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
