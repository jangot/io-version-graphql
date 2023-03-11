import { BaseContext } from '@apollo/server';
import { ServerContext } from './server';
import { Services } from './services';

export interface AppContext extends BaseContext {
    resId: string;
    server: ServerContext;
    services: Services;
}