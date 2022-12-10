import { EnvironmentEntitie } from './environment';
import { VersionEntitie } from './version';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'deploy' })
@Index(['version', 'environment'], { unique: true })
export class DeployEntitie {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => VersionEntitie, (version) => version.deploy, { nullable: false })
    version: VersionEntitie;

    @Column()
    versionId: number;

    @ManyToOne(() => EnvironmentEntitie, (env) => env.deploy, { nullable: false })
    environment: EnvironmentEntitie;

    @Column()
    environmentId: number;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
