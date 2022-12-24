import { getApplications } from './applications';
import { getDeploy } from './deploy';
import { getEnvironments } from './environment';
import { getRules } from './rules';
import { getVersions } from './versions';

type cb = (a: any) => any
const factories: cb[] = [
    getApplications,
    getRules,
    getVersions,
    getEnvironments,
    getDeploy
];

const status = {
    ready: true
}

export const getResolvers = async(): Promise<any> => {
    const base = {
        Query: {
            status: () => status
        },
        Mutation: {
            status: () => {
                status.ready = !status.ready;

                return status;
            }
        }
    }
    return factories.reduce((memo, factory) => factory(memo), base);
};