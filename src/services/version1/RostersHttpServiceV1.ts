import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class RostersHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/rosters');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-rosters', 'controller', 'default', '*', '1.0'));
    }
}