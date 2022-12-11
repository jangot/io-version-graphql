import { AppContext } from '../AppContext';
import { Rule, RuleKey } from '../generated/graphql';

export const getRules = (base: any) => {
    base.Query = base.Query || {};

    base.Query.rules = async (p, a, ctx: AppContext): Promise<Rule[]> => {
        return ctx.services.rule.find();
    }

    base.Query.ruleKeys = async (p, a, ctx: AppContext): Promise<RuleKey[]> => {
        return ctx.services.ruleKey.repo.find();
    }

    base.Rule = {
        key: (rule: Rule, a, ctx: AppContext): Promise<RuleKey> => {
            return ctx.services.ruleKey.loaderById.load(rule.keyId);
        }
    }

    return base;
};