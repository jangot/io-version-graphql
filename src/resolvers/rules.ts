import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { AppContext } from '../AppContext';
import { Rule, RuleKey, RuleKeyInlut } from '../generated/graphql';
import { EntitieNotFoundError } from '../error/EntitieNotFoundError';
import { ApplicationGraphqlError } from '../error/ApplicationGraphqlError';

export const getRules = (base: any) => {
    base.Query = base.Query || {};
    base.Mutation = base.Mutation || {};

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

    base.Mutation.ruleKey = async (p, args: { ruleKey: RuleKeyInlut }, ctx: AppContext) => {
        try {
            return args.ruleKey.id
            ? ctx.services.ruleKey.save(args.ruleKey.id, args.ruleKey)
            : ctx.services.ruleKey.create(args.ruleKey);
        } catch (error) {
            if (error instanceof EntitieNotFoundError) {
                throw new GraphQLError(error.message, {
                    extensions: { code: ApplicationGraphqlError.ENTITY_NOT_FOUND },
                  });
            }

            throw new GraphQLError(error.message, {
                extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
              });
        }

    };

    return base;
};