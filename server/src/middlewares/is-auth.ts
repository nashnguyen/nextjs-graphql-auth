import { AuthenticationError } from 'apollo-server-express';
import type { Request } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

const isAuth = (req: Request) => {
  try {
    const authorization = req.header('Authorization');

    const accessToken = authorization && authorization.split(' ')[1];

    if (!accessToken) throw new Error('Not authenticated');

    const decodedUser = verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload & { userId: string };

    return decodedUser;
  } catch (error) {
    throw new AuthenticationError(error);
  }
};

export default isAuth;
