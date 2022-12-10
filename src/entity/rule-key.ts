import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RuleEntitie } from './rule';

@Entity({ name: 'rule_key' })
@Index(['name'])
export class RuleKeyEntitie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @OneToMany(() => RuleEntitie, (rule) => rule.key)
    rules: RuleEntitie[];

    @Column({ nullable: false, default: 1 })
    specificity: number;
}
