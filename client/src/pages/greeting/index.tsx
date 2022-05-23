import { useGreetingQuery } from '@graphql/generrated/graphql';

const Greeting = () => {
  const [greetingResult, _] = useGreetingQuery();
  const { data, fetching, error } = greetingResult;

  if (fetching) return <h3>Loading ....</h3>;

  if (error)
    return <h3 style={{ color: 'red' }}>Error: {JSON.stringify(error)}</h3>;

  return <h3>{data?.greeting}</h3>;
};

export default Greeting;
