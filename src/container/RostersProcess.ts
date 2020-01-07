import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { RostersServiceFactory } from '../build/RostersServiceFactory';

export class RostersProcess extends ProcessContainer {

    public constructor() {
        super("rosters", "Shift rosters microservice");
        this._factories.add(new RostersServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
