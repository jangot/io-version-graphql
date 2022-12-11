import { BaseContext } from '@apollo/server';
import { Server } from './server';
import { Services } from './services/Services';

export interface AppContext extends BaseContext {
    resId: string;
    server: Server;
    services: Services;
}