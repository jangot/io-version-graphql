import { AppContext } from 'src/AppContext';
import { Application } from 'src/generated/graphql';

export const getApplications = (base: any) => {
    base.Query = base.Query || {};

    base.Query.applications = async(p, a, ctx: AppContext): Promise<Application[]> => {
        return ctx.services.application.findList();
    }

    base.Query.application = async(p, args, ctx: AppContext): Promise<Application | null> => {
        return ctx.services.application.loaderById.load(args.id);
    }

    return base;
}
