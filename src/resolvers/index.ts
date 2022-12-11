import { getApplications } from './applications';
import { getEnvironments } from './environment';
import { getRules } from './rules';
import { getVersions } from './versions';

type cb = (a: any) => any
const factories: cb[] = [
    getApplications,
    getRules,
    getVersions,
    getEnvironments
]

export const getResolvers = async(): Promise<any> => {
    const base = {
        Query: {
            status: () => ({ ready: true })
        }
    }
    return factories.reduce((memo, factory) => factory(memo), base);
};