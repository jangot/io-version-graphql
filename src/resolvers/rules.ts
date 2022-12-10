import { AppContext } from '../AppContext';
import { RuleKeyEntitie } from '../entity/rule-key';
import { Rule } from '../generated/graphql';
import { RuleEntitie } from '../entity/rule';

export const getRules = (base: any) => {
    base.Query = base.Query || {};

    base.Query.rules = async (p, a, ctx: AppContext): Promise<Rule[]> => {
        return ctx.server.db.getRepository(RuleEntitie).find();
    }

    base.Rule = {
        key: (rule: Rule, a, ctx: AppContext) => {
            return ctx.server.db
                .getRepository(RuleKeyEntitie)
                .findOneBy({ id: rule.keyId });
        }
    }

    return base;
};