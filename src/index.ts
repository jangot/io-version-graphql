import 'reflect-metadata';
import * as express from 'express';
import * as http from 'http';
import { json } from 'body-parser';
import * as cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
    ApolloServerPluginLandingPageLocalDefault,
  } from '@apollo/server/plugin/landingPage/default';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { AppContext } from './AppContext';
import { serverContext } from './server';
import { getResolvers } from './resolvers';
import { Services } from './services';
import { getApiRouter } from './api';

(async () => {
    await serverContext.init();

    const app = express();
    const httpServer = http.createServer(app);

    const resolvers = await getResolvers();

    const apollo = new ApolloServer<AppContext>({
        typeDefs: [
            loadSchemaSync("./scheme/*.graphql", {
                loaders: [new GraphQLFileLoader()],
            })
        ],
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true })
        ]
    });

    await apollo.start();

    const services = new Services(serverContext)

    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        json(),
        expressMiddleware(apollo, {
            context: async (ctx): Promise<AppContext> => {
                return {
                    ...ctx,
                    server: serverContext,
                    services,
                    resId: '12w-12w',
                }
            },
        }),
    );

    app.use('/api', getApiRouter({ serverContext, services }));

    await new Promise<void>((resolve) => httpServer.listen({ port: serverContext.config.port }, resolve));

    serverContext.logger.info(`🚀  Server ready at: localhost:${serverContext.config.port}`);
})();
