import { FunctionComponent, ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FunctionComponent<MainContainerProps> = ({ children }) => {
  return (
    <>
      <header className='bg-white shadow'>
        <div className='mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        </div>
      </header>
      <main>
        <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='px-4 py-6 sm:px-0'>{children}</div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

export default MainContainer;
