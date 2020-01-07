import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { RosterV1 } from '../data/version1/RosterV1';
import { IRostersPersistence } from './IRostersPersistence';
export declare class RostersMemoryPersistence extends IdentifiableMemoryPersistence<RosterV1, string> implements IRostersPersistence {
    constructor();
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RosterV1>) => void): void;
}
