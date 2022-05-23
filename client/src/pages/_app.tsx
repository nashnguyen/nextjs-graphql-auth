import type { ReactElement } from 'react';
import { withUrqlClient } from 'next-urql';
import type { AppPropsWithLayout } from 'next/app';

import '@styles/globals.css';
import urqlClientOption from '@utils/urql-client';

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return getLayout(<Component {...pageProps} />);
};

export default withUrqlClient(urqlClientOption, {
  ssr: true,
  neverSuspend: true
})(MyApp);
