import { GraphQLError } from 'graphql';
import { ApplicationGraphqlError } from '../error/ApplicationGraphqlError';
import { AppContext } from '../AppContext';
import { Deploy, Version, Environment, DeployInput } from '../generated/graphql';

export const getDeploy = (base: any) => {
    base.Query = base.Query || {};
    base.Mutation = base.Mutation || {};

    base.Query.deploys = async(p, a, ctx: AppContext): Promise<Deploy[]> => {
        return ctx.services.deploy.findList();
    }

    base.Deploy = {
        version: (deploy: Deploy, a, ctx: AppContext): Promise<Version> => {
            return ctx.services.version.loaderById.load(deploy.versionId);
        },
        environment: (deploy: Deploy, a, ctx: AppContext): Promise<Environment> => {
            return ctx.services.environment.loaderById.load(deploy.environmentId);
        },
    }

    base.Mutation.deploy = async(p, args: { deploy: DeployInput }, ctx: AppContext): Promise<Deploy> => {
        const [
            versionExist,
            environmentExist,
            deployExist
        ] = await Promise.all([
            ctx.services.version.repo.exist({ where: { id: args.deploy.versionId }}),
            ctx.services.environment.repo.exist({ where: { id: args.deploy.environmentId }}),
            ctx.services.deploy.repo.exist({
                where: {
                    versionId: args.deploy.versionId,
                    environmentId: args.deploy.environmentId,
                }
            }),
        ]);
        if (!versionExist || !environmentExist) {
            const message = !versionExist
                ? `Version ${args.deploy.versionId} doesn't exist`
                : `Environment ${args.deploy.environmentId} doesn't exist`;

            throw new GraphQLError(message, {
                extensions: { code: ApplicationGraphqlError.ENTITY_NOT_FOUND },
            });
        }

        if (deployExist) {
            throw new GraphQLError(`The version alredy deployed`, {
                extensions: { code: ApplicationGraphqlError.ENTITY_ALREDY_EXIST },
            });
        }

        return ctx.services.deploy.create(args.deploy);
    }

    return base;
}
