import { Router } from 'express';
import { Services } from 'src/services';
import { ServerContext } from '../server'

interface ApiOprtions {
    services: Services;
    serverContext: ServerContext;
}

// {
//     "env": "Navigation testing users",
//     "value": "444",
//     "key": "user",
//     "version": "1.2.4",
//     "app": "audit-logs",
//     "created": "2022-11-13T17:07:28.139Z"
// }

export function getApiRouter({ services, serverContext }: ApiOprtions): Router {
    const apiRouter = Router();

    apiRouter.get('/application/:name', async(req, res) => {
        const { name } = req.params;
        const entiry = await services.application.repo.findOneBy({ name });
        const query = await serverContext.db
            .createQueryBuilder()

            .select('e.name', 'env')
            .addSelect('e.id', 'id')
            .addSelect('rk.name', 'key')
            .addSelect('r.value', 'value')
            .addSelect('d.created_at', 'created')
            .addSelect('v.version', 'version')
            .addSelect('a.name', 'app')

            .from('environment', 'e')
            .innerJoin('rule', 'r', 'r.environment_id = e.id')
            .innerJoin('rule_key', 'rk', 'rk.id = r.key_id')
            .innerJoin('deploy', 'd', 'd.environment_id = e.id')
            .innerJoin('version', 'v', 'v.id = d.version_id')
            .innerJoin('application', 'a', 'a.id = v.application_id')

            .where('a.name = :appName', { appName: name })
            .orderBy('e.order_index', 'DESC')
            .addOrderBy('e.name')
            .addOrderBy('d.created_at')

            .execute()

        const result = query.reduce((memo, item) => {
            // TODO add env orders
            memo[item.id] = memo[item.id] || { name: item.env };

            memo[item.id].rules = memo[item.id].rules || {};
            memo[item.id].rules[item.key] = memo[item.id].rules[item.key] || [];

            if (!memo[item.id].rules[item.key].includes(item.value)) {
                memo[item.id].rules[item.key].push(item.value);
            }

            memo[item.id].versions = memo[item.id].versions || [];
            if (!memo[item.id].versions.includes(item.version)) {
                memo[item.id].versions.push(item.version);
            }

            return memo;
        }, {});

        res.send({ entiry, result });
    });

    return apiRouter;
}
