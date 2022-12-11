import { ApplicationEntitie } from './application';
import { DeployEntitie } from './deploy';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany } from 'typeorm';

@Entity({ name: 'version' })
@Index(['version', 'application'], { unique: true })
export class VersionEntitie {
    @PrimaryGeneratedColumn()
    id: string;

    // @Column({ nullable: false })
    @Column({ default: '0.0.0' })
    version: string;

    @Column()
    applicationId: string;

    @ManyToOne(() => ApplicationEntitie, (application) => application.versions, { nullable: false })
    application: ApplicationEntitie;

    @OneToMany(() => DeployEntitie, (deploy) => deploy.version)
    deploys: DeployEntitie[]

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
