import { In } from 'typeorm';
import * as DataLoader from 'dataloader';
import { Server } from './index';
import { ApplicationEntitie } from '../entity/application';
import { RuleKeyEntitie } from '../entity/rule-key';
import { VersionEntitie } from '../entity/version';

// TODO check order of the results
export class DataLoaders {
    application: DataLoader<string, ApplicationEntitie>;
    ruleKey: DataLoader<string, RuleKeyEntitie>;
    version: DataLoader<string, VersionEntitie>;
    versionByApplication: DataLoader<string, VersionEntitie>;

    constructor(private server: Server) {
        this.application = new DataLoader((keys: Array<string>) => {
            return this.server.db.getRepository(ApplicationEntitie).find({
                where: { id: In(keys) },
                relations: {
                    versions: true
                }
            });
        });
        this.ruleKey = new DataLoader((keys: Array<string>) => {
            return this.server.db.getRepository(RuleKeyEntitie).find({
                where: { id: In(keys) }
            });
        });
        this.version = new DataLoader((keys: Array<string>) => {
            return this.server.db.getRepository(VersionEntitie).find({
                where: { id: In(keys) }
            });
        });
    }
}