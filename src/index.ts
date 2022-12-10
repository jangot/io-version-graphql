import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { AppContext } from './AppContext';
import server from './Server';
import { resolvers } from './resolvers';

const apollo = new ApolloServer<AppContext>({
    typeDefs: loadSchemaSync("./scheme/*.graphql", {
        loaders: [new GraphQLFileLoader()],
      }),
    resolvers,
    plugins: [
        /* @ts-ignore */
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});

(async () => {
    await server.init();
    const { url } = await startStandaloneServer(apollo, {
        listen: { port: server.config.port },
        context: async (ctx): Promise<AppContext> => {
            return {
                ...ctx,
                server,
                resId: '12w-12w',
            }
        }
    });

    server.logger.info(`🚀  Server ready at: ${url}`);
})();
