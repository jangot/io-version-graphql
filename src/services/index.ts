import { Server } from '../server';
import { ApplicationService } from './ApplicationService';
import { EnvironmentService } from './EnvironmentService';
import { RuleKeyService } from './RuleKeyService';
import { RuleService } from './RuleService';
import { VersionService } from './VersionService';

export class Services {
    application: ApplicationService;
    version: VersionService;
    ruleKey: RuleKeyService;
    environment: EnvironmentService;
    rule: RuleService;

    constructor(private server: Server) {
        this.application = new ApplicationService(this.server.db);
        this.version = new VersionService(this.server.db);
        this.ruleKey = new RuleKeyService(this.server.db);
        this.environment = new EnvironmentService(this.server.db);
        this.rule = new RuleService(this.server.db);
    }
}