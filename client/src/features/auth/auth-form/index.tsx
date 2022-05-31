import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { setAccessToken } from 'shared/utils/token';
import { useSignInMutation, useSignUpMutation } from './operations.gen';

const AuthForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSignInMode, setIsSignInMode] = useState(true);
  const router = useRouter();

  const [_, signIn] = useSignInMutation();
  const [__, signUp] = useSignUpMutation();

  const handleSwitchMode = () => {
    setIsSignInMode(prevMode => !prevMode);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data, error } = isSignInMode
      ? await signIn({ signInInput: { username, password } })
      : await signUp({ signUpInput: { username, password } });

    if (data) {
      const accessToken =
        'signIn' in data ? data.signIn.accessToken : data.signUp.accessToken;
      setAccessToken(accessToken);
      router.push('/');
    } else {
      if (error) setErrorMsg(error.message);
    }
  };

  return (
    <>
      <div>
        <img
          className='mx-auto h-12 w-auto'
          src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
          alt='Workflow'
        />
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          {isSignInMode ? 'Sign in to your account' : 'Sign up new account'}
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Or{' '}
          <a
            className='cursor-pointer font-bold text-indigo-600 hover:text-indigo-500'
            onClick={handleSwitchMode}
          >
            {isSignInMode ? 'Sign up a new account' : 'Sign in to your account'}
          </a>
        </p>
      </div>
      {errorMsg && <p className='font-bold text-red-500'>{errorMsg}</p>}
      <form
        className='mt-8 space-y-6'
        action='#'
        method='POST'
        onSubmit={handleSubmit}
      >
        <input type='hidden' name='remember' defaultValue='true' />
        <div className='-space-y-px rounded-md shadow-sm'>
          <div>
            <label htmlFor='username' className='sr-only'>
              Username
            </label>
            <input
              id='username'
              name='username'
              type='text'
              value={username}
              placeholder='Username'
              required
              onChange={e => {
                setUsername(e.target.value);
              }}
              className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            />
          </div>
          <div>
            <label htmlFor='password' className='sr-only'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={password}
              placeholder='Password'
              required
              onChange={e => {
                setPassword(e.target.value);
              }}
              className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
            />
          </div>
        </div>
        <div>
          <button
            type='submit'
            className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            {isSignInMode ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
