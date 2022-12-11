import { BaseContext } from '@apollo/server';
import { Server } from './server';
import { Services } from './services';

export interface AppContext extends BaseContext {
    resId: string;
    server: Server;
    services: Services;
}