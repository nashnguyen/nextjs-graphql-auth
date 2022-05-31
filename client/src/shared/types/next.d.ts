import type { ReactElement } from 'react';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

declare module 'next' {
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

declare module 'next/app' {
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
