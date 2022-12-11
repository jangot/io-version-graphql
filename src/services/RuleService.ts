import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { RuleEntitie } from '../entity/rule';

export class RuleService {
    repo: Repository<RuleEntitie>;
    loaderById: DataLoader<string, RuleEntitie>;
    loaderByEnviromentId: DataLoader<string, RuleEntitie[]>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(RuleEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const rules = await this.db.getRepository(RuleEntitie).find({
                where: { id: In(keys) }
            });

            return keys.map((key) => rules.find((rule) => rule.id == key));
        });
        this.loaderByEnviromentId = new DataLoader(async(keys: Array<string>) => {
            const rules = await this.db.getRepository(RuleEntitie).find({
                where: { environmentId: In(keys) }
            });

            return keys.map((key) => rules.filter((rule) => rule.environmentId == key));
        });
    }

    find(): Promise<RuleEntitie[]> {
        return this.repo.find({});
    }
}