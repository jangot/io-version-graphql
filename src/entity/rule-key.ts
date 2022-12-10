import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rule } from './rule';

@Entity()
@Index(['name'])
export class RuleKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @OneToMany(() => Rule, (rule) => rule.key)
    rules: Rule[];

    @Column({ nullable: false, default: 1 })
    specificity: number;
}
