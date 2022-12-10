import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Version } from './version';

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    @Index({ unique: true })
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Version, (version) => version.application)
    versions: Version[];
}
