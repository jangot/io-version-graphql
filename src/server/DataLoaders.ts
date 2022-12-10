import { In } from 'typeorm';
import * as DataLoader from 'dataloader';
import { Server } from './index';
import { ApplicationEntitie } from '../entity/application';
import { RuleKeyEntitie } from '../entity/rule-key';

export class DataLoaders {
    application: DataLoader<string, ApplicationEntitie>;
    ruleKey: DataLoader<string, RuleKeyEntitie>;

    constructor(private server: Server) {
        this.application = new DataLoader((keys: Array<string>) => {
            return this.server.db.getRepository(ApplicationEntitie).find({
                where: { id: In(keys) }
            });
        });
        this.ruleKey = new DataLoader((keys: Array<string>) => {
            return this.server.db.getRepository(RuleKeyEntitie).find({
                where: { id: In(keys) }
            });
        });

    }
}