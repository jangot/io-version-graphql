import { ApplicationEntitie } from '../entity/application';
import { DataSource, In, Repository } from 'typeorm';
import DataLoader from 'dataloader';

export class ApplicationService {
    repo: Repository<ApplicationEntitie>;
    loaderById: DataLoader<string, ApplicationEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(ApplicationEntitie);

        this.loaderById = new DataLoader((keys: Array<string>) => {
            return this.db.getRepository(ApplicationEntitie).find({
                where: { id: In(keys) },
                relations: {
                    versions: true
                }
            });
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