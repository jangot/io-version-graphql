import { getApplications } from './applications';
import { getRules } from './rules';

type cb = (a: any) => any
const factories: cb[] = [
    getApplications,
    getRules
]

export const getResolvers = async(): Promise<any> => {
    const base = {
        Query: {
            status: () => ({ ready: true })
        }
    }
    return factories.reduce((memo, factory) => factory(memo), base);
};