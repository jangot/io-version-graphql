import { ApplicationEntitie } from '../entity/application';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { ApplicationInput } from 'src/generated/graphql';

export class ApplicationService {
    repo: Repository<ApplicationEntitie>;
    loaderById: DataLoader<string, ApplicationEntitie>;

    constructor(private db: DataSource) {
        this.repo = db.getRepository(ApplicationEntitie);

        this.loaderById = new DataLoader(async(keys: Array<string>) => {
            const apps = await this.db.getRepository(ApplicationEntitie).find({
                where: { id: In(keys) }
            });

            return keys.map((key) => apps.find((app) => app.id == key));
        });
    }

    create(input: ApplicationInput): Promise<ApplicationEntitie> {
        const app = new ApplicationEntitie();
        app.name = input.name;
        app.isActive = input.isActive;

        return this.repo.save(app);
    }

    async save(id: string, input: ApplicationInput): Promise<ApplicationEntitie> {
        const app = await this.repo.findOneBy({ id });
        app.name = input.name;
        app.isActive = input.isActive;

        return this.repo.save(app);
    }

    findList(): Promise<ApplicationEntitie[]> {
        return this.repo.find({});
    }
}