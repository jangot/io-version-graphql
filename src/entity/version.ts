import { ApplicationEntitie } from './application';
import { DeployEntitie } from './deploy';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany } from 'typeorm';

@Entity({ name: 'version' })
@Index(['version', 'application'], { unique: true })
export class VersionEntitie {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ nullable: false })
    @Column('simple-array', { default: '0.0.0' })
    version: string;

    @ManyToOne(() => ApplicationEntitie, (application) => application.versions, { nullable: false })
    application: ApplicationEntitie;

    @Column()
    applicationId: number;

    @OneToMany(() => DeployEntitie, (deploy) => deploy.version)
    deploy: DeployEntitie[]

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
