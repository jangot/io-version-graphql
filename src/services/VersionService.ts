import { VersionEntitie } from '../entity/version';
import { DataSource, In, Repository } from 'typeorm';
import * as DataLoader from 'dataloader';
import { VersionInput } from '../generated/graphql';

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
            const versions = await this.repo
                .createQueryBuilder('versions')
                .where('versions.applicationId In(:...keys)', { keys: keys.map(Number) })
                .orderBy('string_to_array(version, \'.\')::int[]', 'DESC')
                .getMany();

            return keys.map((key) => versions.filter((ver) => ver.applicationId == key));
        });
    }

    findList(): Promise<VersionEntitie[]> {
        return this.repo.find({});
            // .createQueryBuilder('versions')
            // .orderBy("string_to_array(version, '.')::int[]")
            // .getMany();
    }

    create(input: VersionInput): Promise<VersionEntitie> {
        const app = new VersionEntitie();
        app.version = input.version;
        app.applicationId = input.applicationId;

        return this.db.getRepository(VersionEntitie).save(app);
    }

    async save(id: string, input: VersionInput): Promise<VersionEntitie> {
        const app = await this.db.getRepository(VersionEntitie).findOneBy({ id });

        app.version = input.version;
        app.applicationId = input.applicationId;

        return this.db.getRepository(VersionEntitie).save(app);
    }
}