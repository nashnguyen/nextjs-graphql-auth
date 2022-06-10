import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

import refreshTokenRouter from '@routes/refresh-token-router';
import schema from '@/schema';
import prisma from '@utils/prisma';
import pubsub from '@utils/pubsub';

const startServer = async () => {
  // Create an Express app
  const app = express();

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(cookieParser());
  app.use('/refresh_token', refreshTokenRouter);

  // Create HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const httpServer = createServer(app);

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  });

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema: schema,
      context: context => {
        return {
          ...context,
          prisma,
          pubsub
        };
      }
    },
    wsServer
  );

  // Set up ApolloServer.
  const apolloServer = new ApolloServer({
    schema: schema,
    context: context => {
      return {
        ...context,
        prisma,
        pubsub
      };
    },
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          };
        }
      },
      // Using GraphQL Playground as a landing page
      ApolloServerPluginLandingPageGraphQLPlayground
    ]
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: { origin: 'http://localhost:3000', credentials: true }
  });

  const PORT = process.env.PORT || 4000;

  // Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>(resolve =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(
    `Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `Subscriptions ready at ws://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};

startServer().catch(error => console.log('Error: ', error));
