import { Deploy } from './deploy';
import { Rule } from './rule';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Environment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, default: 1 })
    orderIndex: number;

    @OneToMany(() => Rule, (rule) => rule.environment)
    rules: Rule[];

    @OneToMany(() => Deploy, (deploy) => deploy.environment)
    deploy: Deploy[];
}
