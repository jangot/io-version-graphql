import { AppContext } from 'src/AppContext';
import { Environment } from 'src/generated/graphql';

export const getEnvironments = (base: any) => {
    base.Query = base.Query || {};

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
            return ctx.services.deploy.loaderByEnviromentId.load(env.id);
        }
    };

    return base;
}
