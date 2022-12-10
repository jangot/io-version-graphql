import { BaseContext } from '@apollo/server';
import { Server } from './server';
import { DataLoaders } from './server/DataLoaders';

export interface AppContext extends BaseContext {
    resId: string;
    server: Server;
    dataLoaders: DataLoaders
}