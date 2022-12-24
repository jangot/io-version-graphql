import { AppContext } from 'src/AppContext';
import { Application, ApplicationInput, Version } from 'src/generated/graphql';

export const getApplications = (base: any) => {
    base.Query = base.Query || {};
    base.Mutation = base.Mutation || {};

    base.Query.application = async(p, args, ctx: AppContext): Promise<Application | null> => {
        return ctx.services.application.loaderById.load(args.id);
    }

    base.Query.applications = async(p, a, ctx: AppContext): Promise<Application[]> => {
        return ctx.services.application.findList();
    }

    base.Mutation.application = async(p, args: { application : ApplicationInput}, ctx: AppContext): Promise<Application> => {
        console.log(args);

        return args.application.id
            ? ctx.services.application.save(args.application.id, args.application)
            : ctx.services.application.create(args.application);
    }

    base.Application = {
        versions: (app, a, ctx: AppContext): Promise<Version[]> => {
            return ctx.services.version.loaderListByApplication.load(app.id);
        }
    }

    return base;
}
