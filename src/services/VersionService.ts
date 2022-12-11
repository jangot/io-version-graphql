import { VersionEntitie } from '../entity/version';
import { DataSource, In, Repository } from 'typeorm';
import DataLoader from 'dataloader';

export class VersionService {
    repo: Repository<VersionEntitie>;

    loaderById: DataLoader<string, VersionEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(VersionEntitie);

        this.loaderById = new DataLoader((keys: Array<string>) => {
            return this.db.getRepository(VersionEntitie).find({
                where: { id: In(keys) }
            });
        });
    }

    findList(): Promise<VersionEntitie[]> {
        return this.repo.find({});
    }
}