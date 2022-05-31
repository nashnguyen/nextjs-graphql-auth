export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  users?: Maybe<Array<User>>;
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
