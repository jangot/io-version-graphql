import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';
import { AppContext } from 'src/AppContext';
import { ApplicationGraphqlError } from '../error/ApplicationGraphqlError';
import { EntitieNotFoundError } from '../error/EntitieNotFoundError';
import { Application, ApplicationInput, Version } from '../generated/graphql';

export const getApplications = (base: any) => {
    base.Query = base.Query || {};
    base.Mutation = base.Mutation || {};

    base.Query.application = async(p, args, ctx: AppContext): Promise<Application | null> => {
        const app = await ctx.services.application.loaderById.load(args.id);

        if (!app) {
            throw new GraphQLError(`Application ${args.id} not found`, {
                extensions: { code: ApplicationGraphqlError.ENTITY_NOT_FOUND },
            });
        }

        return app;
    }

    base.Query.applications = async(p, a, ctx: AppContext): Promise<Application[]> => {
        return ctx.services.application.findList();
    }

    base.Mutation.application = async(p, args: { application : ApplicationInput}, ctx: AppContext): Promise<Application> => {
        try {
            return args.application.id
            ? ctx.services.application.save(args.application.id, args.application)
            : ctx.services.application.create(args.application);
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

    base.Application = {
        versions: (app, a, ctx: AppContext): Promise<Version[]> => {
            return ctx.services.version.loaderListByApplication.load(app.id);
        }
    }

    return base;
}
