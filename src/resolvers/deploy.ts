import { AppContext } from 'src/AppContext';
import { Deploy, Version, Environment } from 'src/generated/graphql';

export const getDeploy = (base: any) => {
    base.Query = base.Query || {};

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

    return base;
}
