import { DeployEntitie } from './deploy';
import { RuleEntitie } from './rule';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'environment' })
export class EnvironmentEntitie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, default: 1 })
    orderIndex: number;

    @OneToMany(() => RuleEntitie, (rule) => rule.environment)
    rules: RuleEntitie[];

    @OneToMany(() => DeployEntitie, (deploy) => deploy.environment)
    deploy: DeployEntitie[];
}
