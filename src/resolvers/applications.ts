import { AppContext } from 'src/AppContext';
import { Application } from 'src/generated/graphql';
import { ApplicationEntitie } from '../entity/application';

export const QueryApplications = async(p, a, ctx: AppContext): Promise<Application[]> => {
    const res = await ctx.server.db.getRepository(ApplicationEntitie).find();

    console.log(res);

    return res;
}
