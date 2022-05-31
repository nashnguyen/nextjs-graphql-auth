import * as Types from '../../../shared/types/types.gen';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignInMutationVariables = Types.Exact<{
  signInInput: Types.SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'UserMutationResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type SignUpMutationVariables = Types.Exact<{
  signUpInput: Types.SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'UserMutationResponse', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };


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