import { ApplicationEntitie } from '../entity/application';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';

export class ApplicationService {
    repo: Repository<ApplicationEntitie>;
    loaderById: DataLoader<string, ApplicationEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(ApplicationEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const apps = await this.db.getRepository(ApplicationEntitie).find({
                where: { id: In(keys) },
                relations: {
                    versions: true
                }
            });

            return keys.map((key) => apps.find((app) => app.id === key));
        });
    }

    findList(): Promise<ApplicationEntitie[]> {
        return this.repo.find({
            relations: {
                versions: true
            }
        });
    }
}