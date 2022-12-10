import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { AppContext } from './AppContext';
import server from './server';
import { getResolvers } from './resolvers';
import { DataLoaders } from './server/DataLoaders';



(async () => {
    await server.init();

    const apollo = new ApolloServer<AppContext>({
        typeDefs: loadSchemaSync("./scheme/*.graphql", {
            loaders: [new GraphQLFileLoader()],
          }),
        resolvers: await getResolvers(),
        dataSources: () => {
            return {};
        },
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
                dataLoaders: new DataLoaders(server),
                resId: '12w-12w',
            }
        }
    });

    server.logger.info(`🚀  Server ready at: ${url}`);
})();
