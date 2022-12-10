import { AppContext } from '../AppContext';
import { RuleKeyEntitie } from '../entity/rule-key';
import { Rule, RuleKey } from '../generated/graphql';
import { RuleEntitie } from '../entity/rule';

export const getRules = (base: any) => {
    base.Query = base.Query || {};

    base.Query.rules = async (p, a, ctx: AppContext): Promise<Rule[]> => {
        return ctx.server.db.getRepository(RuleEntitie).find();
    }

    base.Query.ruleKeys = async (p, a, ctx: AppContext): Promise<RuleKey[]> => {
        return ctx.server.db.getRepository(RuleKeyEntitie).find();
    }

    base.Rule = {
        key: (rule: Rule, a, ctx: AppContext): Promise<RuleKey> => {
            return ctx.dataLoaders.ruleKey.load(rule.keyId);
        }
    }

    return base;
};