import { AppContext } from 'src/AppContext';
import { Environment } from 'src/generated/graphql';

export const getEnvironments = (base: any) => {
    base.Query = base.Query || {};

    base.Query.environments = async(p, a, ctx: AppContext): Promise<Environment[]> => {
        return ctx.services.environment.find();
    }

    // base.Environment

    return base;
}
