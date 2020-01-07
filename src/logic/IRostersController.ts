import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { RosterV1 } from '../data/version1/RosterV1';

export interface IRostersController {
    getRosters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<RosterV1>) => void): void;

    getRosterById(correlationId: string, roster_id: string, 
        callback: (err: any, roster: RosterV1) => void): void;

    createRoster(correlationId: string, roster: RosterV1, 
        callback: (err: any, roster: RosterV1) => void): void;

    updateRoster(correlationId: string, roster: RosterV1, 
        callback: (err: any, roster: RosterV1) => void): void;

    deleteRosterById(correlationId: string, roster_id: string,
        callback: (err: any, roster: RosterV1) => void): void;
}
