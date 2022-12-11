import DataLoader from 'dataloader';
import { RuleKeyEntitie } from '../entity/rule-key';
import { DataSource, In, Repository } from 'typeorm';

export class RuleKeyService {
    repo: Repository<RuleKeyEntitie>;
    loaderById: DataLoader<string, RuleKeyEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(RuleKeyEntitie);

        this.loaderById = new DataLoader((keys: Array<string>) => {
            return this.db.getRepository(RuleKeyEntitie).find({
                where: { id: In(keys) }
            });
        });
    }
}