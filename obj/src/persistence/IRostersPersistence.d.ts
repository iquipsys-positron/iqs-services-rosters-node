import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { RosterV1 } from '../data/version1/RosterV1';
export interface IRostersPersistence extends IGetter<RosterV1, string>, IWriter<RosterV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RosterV1>) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: RosterV1) => void): void;
    create(correlationId: string, item: RosterV1, callback: (err: any, item: RosterV1) => void): void;
    update(correlationId: string, item: RosterV1, callback: (err: any, item: RosterV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: RosterV1) => void): void;
}
