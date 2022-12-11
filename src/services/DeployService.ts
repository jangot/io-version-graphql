import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { DeployEntitie } from '../entity/deploy';

export class DeployService {
    repo: Repository<DeployEntitie>;
    loaderById: DataLoader<string, DeployEntitie>;
    loaderByEnviromentId: DataLoader<string, DeployEntitie[]>;
    loaderByVersionId: DataLoader<string, DeployEntitie[]>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(DeployEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const deploys = await this.repo.find({ where: { id: In(keys) } });

            return keys.map((key) => deploys.find((deploy) => deploy.id == key));
        });
        this.loaderByEnviromentId = new DataLoader(async(keys: Array<string>) => {
            const deploys = await this.repo.find({
                where: { environmentId: In(keys) }
            });

            return keys.map((key) => deploys.filter((deploy) => deploy.environmentId == key));
        });
        this.loaderByVersionId = new DataLoader(async(keys: Array<string>) => {
            const deploys = await this.repo.find({
                where: { versionId: In(keys) }
            });

            return keys.map((key) => deploys.filter((deploy) => deploy.versionId == key));
        });
    }

    findList(): Promise<DeployEntitie[]> {
        return this.repo.find({});
    }
}