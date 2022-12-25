import { Version, VersionInput } from '../generated/graphql';
import { AppContext } from '../AppContext';
import { EntitieNotFoundError } from '../error/EntitieNotFoundError';
import { GraphQLError } from 'graphql';
import { ApplicationGraphqlError } from '../error/ApplicationGraphqlError';
import { ApolloServerErrorCode } from '@apollo/server/errors';

export function getVersions(base: any) {
    base.Query = base.Query || {};
    base.Mutation = base.Mutation || {};

    base.Query.versions = async(p, a, ctx: AppContext): Promise<Version[]> => {
        return ctx.services.version.findList();
    }
    base.Version = {
        application: (version: Version, a, ctx: AppContext) => {
            return ctx.services.application.loaderById.load(version.applicationId);
        },
        deploys: (version: Version, a, ctx: AppContext) => {
            return ctx.services.deploy.loaderByVersionId.load(version.id);
        },
    }

    base.Mutation.version = async (
        p,
        args: { version: VersionInput },
        ctx: AppContext
    ): Promise<Version> => {
        const appExist = await ctx.services.application.repo.exist({
            where: { id: args.version.applicationId }
        });
        if(!appExist) {
            throw new GraphQLError(`Application ${args.version.applicationId} does't exist`, {
                extensions: { code: ApplicationGraphqlError.ENTITY_NOT_FOUND },
            });
        }

        try {
            return args.version.id
                ? ctx.services.version.save(args.version.id, args.version)
                : ctx.services.version.create(args.version);
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