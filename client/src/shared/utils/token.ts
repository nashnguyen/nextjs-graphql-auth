let inMemoryToken: string | null = null;

const getAccessToken = () => inMemoryToken;

const setAccessToken = (accessToken: string) => {
  inMemoryToken = accessToken;
};

export { setAccessToken, getAccessToken };
