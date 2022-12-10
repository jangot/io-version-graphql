import pino, { Logger } from 'pino';
import { AppConfig } from './configuration';

const config: AppConfig =  {
    port: 5555
}

class Application {
    logger: Logger;

    config: AppConfig = config;

    async init() {
        this.logger = pino();
    }
}

export default new Application();
