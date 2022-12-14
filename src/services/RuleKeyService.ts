import * as DataLoader from 'dataloader';
import { RuleKeyEntitie } from '../entity/rule-key';
import { DataSource, In, Repository } from 'typeorm';
import { RuleKeyInput } from 'src/generated/graphql';

export class RuleKeyService {
    repo: Repository<RuleKeyEntitie>;
    loaderById: DataLoader<string, RuleKeyEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(RuleKeyEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const ruleKeys = await this.db.getRepository(RuleKeyEntitie).find({
                where: { id: In(keys) }
            });

            return keys.map((key) => ruleKeys.find((ruleKey) => ruleKey.id == key));
        });
    }

    create(input: RuleKeyInput) {
        const rk = new RuleKeyEntitie();
        rk.name = input.name;
        rk.specificity = input.specificity;

        return this.db.getRepository(RuleKeyEntitie).save(rk);
    }

    async save(id: string, input: RuleKeyInput) {
        const rk = await this.db.getRepository(RuleKeyEntitie).findOneBy({ id });
        rk.name = input.name;
        rk.specificity = input.specificity;

        return this.db.getRepository(RuleKeyEntitie).save(rk);
    }
}