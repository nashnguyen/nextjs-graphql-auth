import { useState } from 'react';
import SignIn from './signin';
import SignUp from './signup';

const AuthForm = () => {
  const [isSignInMode, setIsSignInMode] = useState(true);

  const handleSwitchMode = () => {
    setIsSignInMode(prevMode => !prevMode);
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
          {isSignInMode ? 'Sign in to your account' : 'Sign up a new account'}
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
      {isSignInMode ? <SignIn /> : <SignUp />}
    </>
  );
};

export default AuthForm;
