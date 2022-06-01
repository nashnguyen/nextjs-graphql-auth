import * as Types from '../../../shared/types/types.gen';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, username: string }> };

export type NewUserSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type NewUserSubscription = { __typename?: 'Subscription', newUser: { __typename?: 'User', id: string, username: string } };


export const UsersDocument = gql`
    query Users {
  users {
    id
    username
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};
export const NewUserDocument = gql`
    subscription NewUser {
  newUser {
    id
    username
  }
}
    `;

export function useNewUserSubscription<TData = NewUserSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewUserSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewUserSubscription, TData>) {
  return Urql.useSubscription<NewUserSubscription, TData, NewUserSubscriptionVariables>({ query: NewUserDocument, ...options }, handler);
};