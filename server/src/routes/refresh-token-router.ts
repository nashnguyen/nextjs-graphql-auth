import express from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

import prisma from '@utils/prisma';
import { createAccessToken, sendRefreshToken } from '@utils/token';

const router = express.Router();

router.get('/', async (req, res) => {
  const refreshToken =
    req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];

  if (!refreshToken) return res.send({ accessToken: '' });

  try {
    const decodedUser = verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload & { userId: string; tokenVersion: number };

    const existingUser = await prisma.user.findUnique({
      where: { id: decodedUser.userId }
    });

    if (
      !existingUser ||
      existingUser.tokenVersion !== decodedUser.tokenVersion
    ) {
      return res.send({ accessToken: '' });
    }

    sendRefreshToken(res, existingUser);

    return res.send({ accessToken: createAccessToken(existingUser) });
  } catch (error) {
    return res.send({ accessToken: '' });
  }
});

export default router;
