import { AppContext } from 'src/AppContext';
import { Application } from 'src/generated/graphql';
import { ApplicationEntitie } from '../entity/application';

export const getApplications = (base: any) => {
    base.Query = base.Query || {};

    base.Query.applications = async(p, a, ctx: AppContext): Promise<Application[]> => {
        return ctx.server.db.getRepository(ApplicationEntitie).find();
    }

    return base;
}
