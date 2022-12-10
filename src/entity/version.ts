import { Application } from './application';
import { Deploy } from './deploy';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, Index, OneToMany } from 'typeorm';

@Entity()
@Index(['version', 'application'], { unique: true })
export class Version {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ nullable: false })
    @Column('simple-array', { default: '0.0.0' })
    version: string;

    @ManyToOne(() => Application, (application) => application.versions, { nullable: false })
    application: Application;

    @Column()
    applicationId: number;

    @OneToMany(() => Deploy, (deploy) => deploy.version)
    deploy: Deploy[]

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}
