import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { DeployEntitie } from '../entity/deploy';

export class DeployService {
    repo: Repository<DeployEntitie>;
    loaderById: DataLoader<string, DeployEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(DeployEntitie);

        this.loaderById = new DataLoader((keys: Array<string>) => {
            return this.db.getRepository(DeployEntitie).find({
                where: { id: In(keys) } });
        });
    }

    findList(): Promise<DeployEntitie[]> {
        return this.repo.find({});
    }
}