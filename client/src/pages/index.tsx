import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'next';

import { Layout } from '@features/shared';

const Index: NextPageWithLayout = () => {
  return <span>hihihi</span>;
};

export default Index;

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
