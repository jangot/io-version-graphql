import { VersionEntitie } from '../entity/version';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export class VersionService {
    repo: Repository<VersionEntitie>;

    loaderById: DataLoader<string, VersionEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(VersionEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const versions = await this.db.getRepository(VersionEntitie).find({
                where: { id: In(keys) },
                relations: {
                    deploy: true,
                }
            });

            return keys.map((key) => versions.find((ver) => ver.id == key));
        });
    }

    findList(): Promise<VersionEntitie[]> {
        return this.repo.find({
            relations: {
                deploy: true,
            }
        });
    }
}