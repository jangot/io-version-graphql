import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { startStandaloneServer } from '@apollo/server/standalone';
import pino, { Logger } from 'pino';
import { AppConfiguration } from './configuration';

const typeDefs = `#graphql
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }
    `;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};


const server = new ApolloServer<AppContext>({
    typeDefs,
    resolvers,
    plugins: [
        /* @ts-ignore */
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});

interface AppContext extends BaseContext {
    resId: string;
    logger: Logger;
}

(async () => {
    const logger = pino();
    const { url } = await startStandaloneServer(server, {
        listen: { port: AppConfiguration.getConfig().port },
        context: async (ctx): Promise<AppContext> => {
            return {
                ...ctx,
                resId: '12w-12w',
                logger
            }
        }
    });

    console.log(`🚀  Server ready at: ${url}`);
})();
