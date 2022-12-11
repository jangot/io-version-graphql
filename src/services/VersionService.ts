import { VersionEntitie } from '../entity/version';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export class VersionService {
    repo: Repository<VersionEntitie>;

    loaderById: DataLoader<string, VersionEntitie>;
    loaderListByApplication: DataLoader<string, VersionEntitie[]>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(VersionEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const versions = await this.db.getRepository(VersionEntitie).find({
                where: { id: In(keys) },
            });

            return keys.map((key) => versions.find((ver) => ver.id == key));
        });
        this.loaderListByApplication = new DataLoader(async(keys: Array<string>) => {
            const versions = await this.db.getRepository(VersionEntitie).find({
                where: { applicationId: In(keys) },
            });

            return keys.map((key) => versions.filter((ver) => ver.applicationId == key));
        });
    }

    findList(): Promise<VersionEntitie[]> {
        return this.repo.find({});
    }
}