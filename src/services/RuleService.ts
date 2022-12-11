import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { RuleEntitie } from '../entity/rule';

export class RuleService {
    repo: Repository<RuleEntitie>;
    loaderById: DataLoader<string, RuleEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(RuleEntitie);

        this.loaderById = new DataLoader((keys: Array<string>) => {
            return this.db.getRepository(RuleEntitie).find({
                where: { id: In(keys) }
            });
        });
    }

    find(): Promise<RuleEntitie[]> {
        return this.repo.find({});
    }
}