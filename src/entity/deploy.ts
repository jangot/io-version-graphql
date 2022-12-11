import { EnvironmentEntitie } from './environment';
import { VersionEntitie } from './version';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'deploy' })
@Index(['version', 'environment'], { unique: true })
export class DeployEntitie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    versionId: string;

    @ManyToOne(() => VersionEntitie, (version) => version.deploy, { nullable: false })
    version: VersionEntitie;

    @Column()
    environmentId: string;

    @ManyToOne(() => EnvironmentEntitie, (env) => env.deploys, { nullable: false })
    environment: EnvironmentEntitie;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
