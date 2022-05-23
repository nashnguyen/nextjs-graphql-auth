import { makeOperation } from '@urql/core';
import { authExchange } from '@urql/exchange-auth';
import { parse } from 'cookie';
import { createClient as createWSClient } from 'graphql-ws';
import type { JwtPayload } from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import type { NextUrqlClientConfig, SSRExchange } from 'next-urql';
import {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
  subscriptionExchange
} from 'urql';

import { setAccessToken } from '@utils/token';

interface AuthState {
  accessToken?: string;
}

const isServerSide = typeof window === 'undefined';

const wsClient = !isServerSide
  ? createWSClient({
      url: 'ws://localhost:4000/graphql'
    })
  : null;

const urqlClientOption: NextUrqlClientConfig = (
  ssrCache: SSRExchange = ssrExchange({ isClient: !isServerSide }),
  context
) => ({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange<AuthState>({
      addAuthToOperation: ({ authState, operation }) => {
        // the token isn't in the auth state, return the operation without changes
        if (!authState || !authState.accessToken) return operation;

        // fetchOptions can be a function (See Client API) but you can simplify this based on usage
        const fetchOptions =
          typeof operation.context.fetchOptions === 'function'
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: authState.accessToken
                ? `Bearer ${authState.accessToken}`
                : ''
            }
          }
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState || !authState.accessToken) return true;

        // e.g. check for expiration, existence of auth etc
        try {
          const { exp } = jwtDecode<JwtPayload>(authState.accessToken);
          if (Date.now() >= exp! * 1000) return false;
          return true;
        } catch {
          return false;
        }
      },
      getAuth: async () => {
        const cookies = parse(context?.req?.headers?.cookie || '');

        if (cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string]) {
          console.log('hi');

          const response = await fetch('http://localhost:4000/refresh_token', {
            credentials: 'include'
          });

          const data = await response.json();

          if (data.accessToken) {
            setAccessToken(data.accessToken);
            return {
              accessToken: data.accessToken
            };
          }
        }

        // otherwise, if refresh fails, log clear storage and log out
        // localStorage.clear();

        // your app logout logic should trigger here
        // logout();

        return null;
      }
    }),
    ssrCache,
    fetchExchange,
    subscriptionExchange({
      enableAllOperations: true,
      forwardSubscription: operation => ({
        subscribe: sink => ({
          unsubscribe: wsClient!.subscribe(operation, sink)
        })
      })
    })
  ]
});

export default urqlClientOption;
