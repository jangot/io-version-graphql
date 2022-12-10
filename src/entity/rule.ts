import { EnvironmentEntitie } from './environment';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RuleKeyEntitie } from './rule-key';

@Entity({ name: 'rule' })
@Index(['key', 'value', 'environment'], { unique: true })
export class RuleEntitie {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    value: string;

    @Column()
    keyId: string;

    @ManyToOne(() => RuleKeyEntitie, (ruleKey) => ruleKey.rules, { nullable: false })
    key: RuleKeyEntitie;

    @Column()
    environmentId: string;

    @ManyToOne(() => EnvironmentEntitie, (env) => env.rules, { nullable: false })
    environment: EnvironmentEntitie;
}
