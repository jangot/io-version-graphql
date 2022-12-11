import { EnvironmentEntitie } from '../entity/environment';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export class EnvironmentService {
    repo: Repository<EnvironmentEntitie>;
    loaderById: DataLoader<string, EnvironmentEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(EnvironmentEntitie);

        this.loaderById = new DataLoader((keys: Array<string>) => {
            return this.db.getRepository(EnvironmentEntitie).find({
                where: { id: In(keys) }
            });
        });
    }
}