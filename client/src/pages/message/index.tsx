import { useNewMessageSubscription } from '@graphql/generrated/graphql';

const Message = () => {
  const [newMessageResult] = useNewMessageSubscription();
  const { data, fetching, error } = newMessageResult;

  if (fetching) return <h3>Loading ....</h3>;

  if (error)
    return <h3 style={{ color: 'red' }}>Error: {JSON.stringify(error)}</h3>;

  return <h3>{data?.newMessage?.message}</h3>;
};

export default Message;
