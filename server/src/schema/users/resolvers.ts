import argon2 from 'argon2';
import { arg, extendType, nonNull } from 'nexus';

import isAuth from '@src/middlewares/is-auth';
import { createAccessToken, sendRefreshToken } from '@src/utils/token';
import {
  SignInInput,
  SignUpInput,
  User,
  UserMutationResponse
} from './type-defs';

const Query = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: nonNull(User),
      resolve: async (_, __, context) => {
        const decodedUser = isAuth(context.req);

        const existingUser = await context.prisma.user.findUnique({
          where: {
            id: decodedUser.userId
          }
        });

        if (!existingUser) throw new Error('Can not find user');

        return await context.prisma.user.findMany();
      }
    });
  }
});

const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signUp', {
      type: UserMutationResponse,
      args: {
        signUpInput: arg({ type: nonNull(SignUpInput) })
      },
      resolve: async (_, args, context) => {
        const { username, password } = args.signUpInput;

        const existingUser = await context.prisma.user.findUnique({
          where: {
            username: username
          }
        });

        if (existingUser) throw new Error('Username already exists');

        const newUser = await context.prisma.user.create({
          data: {
            username: username,
            password: await argon2.hash(password)
          }
        });

        context.pubsub.publish('newUser', newUser);

        return { user: newUser, accessToken: createAccessToken(newUser) };
      }
    });
    t.nonNull.field('signIn', {
      type: UserMutationResponse,
      args: {
        signInInput: arg({ type: nonNull(SignInInput) })
      },
      resolve: async (_, args, context) => {
        const { username, password } = args.signInInput;

        const existingUser = await context.prisma.user.findUnique({
          where: {
            username: username
          }
        });

        if (!existingUser) throw new Error('Invalid username');

        const isPasswordValid = await argon2.verify(
          existingUser.password,
          password
        );

        if (!isPasswordValid) throw new Error('Incorrect password');

        sendRefreshToken(context.res, existingUser);

        return {
          user: existingUser,
          accessToken: createAccessToken(existingUser)
        };
      }
    });
  }
});

const Subscription = extendType({
  type: 'Subscription',
  definition(t) {
    t.nonNull.field('newUser', {
      type: nonNull(User),
      subscribe: async (_, __, context) => {
        return context.pubsub.asyncIterator('newUser');
      },
      resolve: payload => {
        return payload;
      }
    });
  }
});

export { Query, Mutation, Subscription };
