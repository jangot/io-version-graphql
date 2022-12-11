import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { AppContext } from './AppContext';
import server from './server';
import { getResolvers } from './resolvers';
import { Services } from './services';



(async () => {
    await server.init();
    const resolvers = await getResolvers();

    const apollo = new ApolloServer<AppContext>({
        typeDefs: [
            loadSchemaSync("./scheme/*.graphql", {
                loaders: [new GraphQLFileLoader()],
            })
        ],
        resolvers,
        plugins: [
            /* @ts-ignore */
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ]
    });

    const { url } = await startStandaloneServer(apollo, {
        listen: { port: server.config.port },
        context: async (ctx): Promise<AppContext> => {
            return {
                ...ctx,
                server,
                services: new Services(server),
                resId: '12w-12w',
            }
        }
    });

    server.logger.info(`🚀  Server ready at: ${url}`);
})();
