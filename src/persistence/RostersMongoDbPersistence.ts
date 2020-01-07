let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { RosterV1 } from '../data/version1/RosterV1';
import { IRostersPersistence } from './IRostersPersistence';

export class RostersMongoDbPersistence extends IdentifiableMongoDbPersistence<RosterV1, string> implements IRostersPersistence {

    constructor() {
        super('rosters');
        super.ensureIndex({ org_id: 1, start_time: -1, end_time: -1 });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let org_id = filter.getAsNullableString('org_id');
        if (org_id != null)
            criteria.push({ org_id: org_id });

        let shift = filter.getAsNullableBoolean('shift');
        if (shift != null)
            criteria.push({ shift_id: { $exists: shift } });
                
        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ end_time: { $gt: fromTime } });

        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ start_time: { $lt: toTime } });

        let time = filter.getAsNullableDateTime('time');
        if (time != null) {
            criteria.push({ start_time: { $lte: time } });
            criteria.push({ end_time: { $gt: time } });
        }

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<RosterV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
