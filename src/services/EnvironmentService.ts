import { EnvironmentEntitie } from '../entity/environment';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export class EnvironmentService {
    repo: Repository<EnvironmentEntitie>;
    loaderById: DataLoader<string, EnvironmentEntitie>;
    loaderByDeploy: DataLoader<string, EnvironmentEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(EnvironmentEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const enviromets = await this.db.getRepository(EnvironmentEntitie).find({
                where: { id: In(keys) }
            });

            return keys.map((key) => enviromets.find((env) => env.id == key));
        });
    }

    find(): Promise<EnvironmentEntitie[]> {
        return this.repo.find({});
    }
}