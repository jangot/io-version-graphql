import { AppContext } from 'src/AppContext';
import { Application } from 'src/generated/graphql';

export const getApplications = (base: any) => {
    base.Query = base.Query || {};

    base.Query.applications = async(p, a, ctx: AppContext): Promise<Application[]> => {
        return ctx.services.application.findList();
    }

    return base;
}
