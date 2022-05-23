import type { User } from '@prisma/client';
import type { Response } from 'express';
import { sign } from 'jsonwebtoken';

const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15s'
  });
};

const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '60m'
    }
  );
};

const sendRefreshToken = (res: Response, user: User) => {
  res.cookie(
    process.env.REFRESH_TOKEN_COOKIE_NAME as string,
    createRefreshToken(user),
    {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/'
    }
  );
};

export { createAccessToken, createRefreshToken, sendRefreshToken };
