import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import app from './Application';
import { resolvers } from './resolvers';

const server = new ApolloServer<AppContext>({
    typeDefs: loadSchemaSync("./scheme/*.graphql", {
        loaders: [new GraphQLFileLoader()],
      }),
    resolvers,
    plugins: [
        /* @ts-ignore */
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});

interface AppContext extends BaseContext {
    resId: string;
}

(async () => {
    await app.init();
    const { url } = await startStandaloneServer(server, {
        listen: { port: app.config.port },
        context: async (ctx): Promise<AppContext> => {
            return {
                ...ctx,
                resId: '12w-12w',
            }
        }
    });

    app.logger.info(`🚀  Server ready at: ${url}`);
})();
