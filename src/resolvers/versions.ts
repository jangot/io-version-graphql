import { Version } from '../generated/graphql';
import { AppContext } from '../AppContext';

export function getVersions(base: any) {
    base.Query = base.Query || {};

    base.Query.versions = async(p, a, ctx: AppContext): Promise<Version[]> => {
        return ctx.services.version.findList();
    }
    base.Version = {
        application: (version: Version, a, ctx: AppContext) => {
            return ctx.services.application.loaderById.load(version.applicationId);
        },
        deploys: (version: Version, a, ctx: AppContext) => {
            return ctx.services.deploy.loaderByVersionId.load(version.id);
        },
    }

    return base;
}