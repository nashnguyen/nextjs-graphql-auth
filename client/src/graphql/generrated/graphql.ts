import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  signIn: UserMutationResponse;
  signUp: UserMutationResponse;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
};

export type SignInInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SignUpInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newUser?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  tokenVersion: Scalars['Int'];
  username: Scalars['String'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'UserMutationResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserMutationResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id: string, username: string } | null> | null };

export type NewUserSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewUserSubscription = { __typename?: 'Subscription', newUser?: { __typename?: 'User', id: string, username: string } | null };


export const SignInDocument = gql`
    mutation SignIn($signInInput: SignInInput!) {
  signIn(signInInput: $signInInput) {
    accessToken
    user {
      id
      username
    }
  }
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const SignUpDocument = gql`
    mutation SignUp($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput) {
    accessToken
    user {
      id
      username
    }
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
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