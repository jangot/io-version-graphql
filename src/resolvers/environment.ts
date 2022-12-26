import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql/error';
import { AppContext } from '../AppContext';
import { ApplicationGraphqlError } from '../error/ApplicationGraphqlError';
import { EntitieNotFoundError } from '../error/EntitieNotFoundError';
import { Environment, EnvironmentInput } from '../generated/graphql';

export const getEnvironments = (base: any) => {
    base.Query = base.Query || {};
    base.Mutation = base.Mutation || {};

    base.Query.environment = async(p, args, ctx: AppContext): Promise<Environment> => {
        return ctx.services.environment.repo.findOneBy({ id: args.id });
    }
    base.Query.environments = async(p, a, ctx: AppContext): Promise<Environment[]> => {
        return ctx.services.environment.find();
    }

    base.Environment = {
        deploys: (env, a, ctx: AppContext) => {
            return ctx.services.deploy.loaderByEnviromentId.load(env.id);
        },
        rules: (env, a, ctx: AppContext) => {
            return ctx.services.rule.loaderByEnviromentId.load(env.id);
        }
    };

    base.Mutation.environment = async(p, args: { environment: EnvironmentInput }, ctx: AppContext): Promise<Environment> => {
        try {
            return args.environment.id
                ? ctx.services.environment.save(args.environment.id, args.environment)
                : ctx.services.environment.create(args.environment);
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
    }

    return base;
}
