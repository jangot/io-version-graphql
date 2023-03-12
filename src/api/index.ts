import { Router } from 'express';
import { Services } from 'src/services';
import { ServerContext } from '../server'
import { VersionRetriverService } from '../services/VersionRetriverService'

interface ApiOprtions {
    services: Services;
    serverContext: ServerContext;
}



export function getApiRouter({ services, serverContext }: ApiOprtions): Router {
    const apiRouter = Router();

    apiRouter.get('/application/:name', async(req, res) => {
        const { name } = req.params;
        const entiry = await services.application.repo.findOneBy({ name });
        const service = new VersionRetriverService(serverContext.db);
        const result = await service.retrive(name);

        res.send({ entiry, result });
    });

    apiRouter.get('/app/:name', async(req, res) => {
        const { name } = req.params;

        const env = await services.environment.repo.find({
            relations: {
                rules: {
                    key: true
                },
                deploys: {
                    version: {
                        application: true
                    }
                }
            },
            where: {
                deploys: {
                    version: {
                        application: { name }
                    }
                }
            }
        });

        res.send({ env });
    });

    return apiRouter;
}
