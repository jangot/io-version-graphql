import pino, { Logger } from 'pino';
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppConfig } from './configuration';
import { entities } from './entity';

const config: AppConfig =  {
    port: 5555
}

export class Server {
    logger: Logger;
    db: DataSource;

    config: AppConfig = config;

    async init() {
        this.logger = pino();
        this.db = new DataSource({
            logging: true,
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123',
            database: 'io_versions_2',
            synchronize: true,
            entities,
            subscribers: [],
            migrations: [],
            namingStrategy: new SnakeNamingStrategy()
        });
        await this.db.initialize();
    }
}

export default new Server();
