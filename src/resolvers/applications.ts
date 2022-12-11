import { AppContext } from 'src/AppContext';
import { Application, Version } from 'src/generated/graphql';

export const getApplications = (base: any) => {
    base.Query = base.Query || {};

    base.Query.application = async(p, args, ctx: AppContext): Promise<Application | null> => {
        return ctx.services.application.loaderById.load(args.id);
    }

    base.Query.applications = async(p, a, ctx: AppContext): Promise<Application[]> => {
        return ctx.services.application.findList();
    }

    base.Application = {
        versions: (app, a, ctx: AppContext): Promise<Version[]> => {
            return ctx.services.version.loaderListByApplication.load(app.id);
        }
    }

    return base;
}
