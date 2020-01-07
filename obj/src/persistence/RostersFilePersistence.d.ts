import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { RostersMemoryPersistence } from './RostersMemoryPersistence';
import { RosterV1 } from '../data/version1/RosterV1';
export declare class RostersFilePersistence extends RostersMemoryPersistence {
    protected _persister: JsonFilePersister<RosterV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
