import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useSignInMutation } from '@graphql/generrated/graphql';
import { setAccessToken } from '@utils/token';

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [_, signIn] = useSignInMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await signIn({ signInInput: { username, password } });

    if (response.data) {
      setAccessToken(response.data.signIn.accessToken);
      router.push('/');
    } else {
      if (response.error) setErrorMsg((response.error as Error).message);
    }
  };

  return (
    <>
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
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};
export default SignIn;
