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

export type Message = {
  __typename?: 'Message';
  from: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewMessage?: Maybe<Message>;
  signIn: UserMutationResponse;
  signUp: UserMutationResponse;
};


export type MutationCreateNewMessageArgs = {
  from?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};

export type Query = {
  __typename?: 'Query';
  greeting?: Maybe<Scalars['String']>;
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
  newMessage?: Maybe<Message>;
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

export type CreateNewMessageMutationVariables = Exact<{
  from?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
}>;


export type CreateNewMessageMutation = { __typename?: 'Mutation', createNewMessage?: { __typename?: 'Message', from: string, message: string } | null };

export type SignInMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'UserMutationResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserMutationResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type GreetingQueryVariables = Exact<{ [key: string]: never; }>;


export type GreetingQuery = { __typename?: 'Query', greeting?: string | null };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'Message', from: string, message: string } | null };


export const CreateNewMessageDocument = gql`
    mutation CreateNewMessage($from: String, $message: String) {
  createNewMessage(from: $from, message: $message) {
    from
    message
  }
}
    `;

export function useCreateNewMessageMutation() {
  return Urql.useMutation<CreateNewMessageMutation, CreateNewMessageMutationVariables>(CreateNewMessageDocument);
};
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
export const GreetingDocument = gql`
    query Greeting {
  greeting
}
    `;

export function useGreetingQuery(options?: Omit<Urql.UseQueryArgs<GreetingQueryVariables>, 'query'>) {
  return Urql.useQuery<GreetingQuery>({ query: GreetingDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    from
    message
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};