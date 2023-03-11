import { Router } from 'express';
import { ServerContext } from '../server'

export function getApiRouter(serverContext: ServerContext): Router {
    const apiRouter = Router();

    apiRouter.get('/', (req, res) => {
      res.send("What's up doc ?!");
    });

    return apiRouter;
}
