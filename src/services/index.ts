import { Server } from '../server';
import { ApplicationService } from './ApplicationService';
import { RuleKeyService } from './RuleKeyService';
import { VersionService } from './VersionService';

export class Services {
    application: ApplicationService;
    version: VersionService;
    ruleKey: RuleKeyService;

    constructor(private server: Server) {
        this.application = new ApplicationService(this.server.db);
        this.version = new VersionService(this.server.db);
        this.ruleKey = new RuleKeyService(this.server.db);
    }
}