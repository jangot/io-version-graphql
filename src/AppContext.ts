import { ApolloServer, BaseContext } from '@apollo/server';
import { Server } from './Server';

export interface AppContext extends BaseContext {
    resId: string;
    server: Server
}