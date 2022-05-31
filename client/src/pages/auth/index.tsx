import type { NextPageWithLayout } from 'next';
import type { ReactElement } from 'react';

import { AuthForm, AuthLayout } from 'features/auth';
import Layout from 'shared/layout';

const Auth: NextPageWithLayout = () => {
  return <AuthForm />;
};

export default Auth;

Auth.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AuthLayout>{page}</AuthLayout>
    </Layout>
  );
};
