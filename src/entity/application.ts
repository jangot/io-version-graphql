import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { VersionEntitie } from './version';

@Entity({
    name: 'application'
})
export class ApplicationEntitie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    @Index({ unique: true })
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => VersionEntitie, (version) => version.application)
    versions: VersionEntitie[];
}
