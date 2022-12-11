import { Version } from '../generated/graphql';
import { AppContext } from '../AppContext';
import { VersionEntitie } from '../entity/version';

export function getVersions(base: any) {
    base.Query = base.Query || {};

    base.Query.versions = async(p, a, ctx: AppContext): Promise<Version[]> => {
        return ctx.server.db.getRepository(VersionEntitie).find();
    }
    base.Version = {
        application: (version: Version, a, ctx: AppContext) => {
            return ctx.dataLoaders.application.load(version.applicationId);
        }
    }

    return base;
}