let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { RosterV1 } from '../data/version1/RosterV1';
import { IRostersPersistence } from './IRostersPersistence';

export class RostersMemoryPersistence 
    extends IdentifiableMemoryPersistence<RosterV1, string> 
    implements IRostersPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let id = filter.getAsNullableString('id');
        let siteId = filter.getAsNullableString('site_id');
        let shift = filter.getAsNullableBoolean('shift');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        let time = filter.getAsNullableDateTime('time');
                
        return (item) => {
            if (id && item.id != id) 
                return false;
            if (siteId && item.site_id != siteId) 
                return false;
            if (shift != null && (!!item.shift_id) != shift) 
                return false;
            if (toTime && item.start_time.getTime() >= toTime.getTime()) 
                return false;
            if (fromTime && item.end_time.getTime() <= fromTime.getTime()) 
                return false;
            if (time && (item.start_time.getTime() > time.getTime() || item.end_time.getTime() <= time.getTime())) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<RosterV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
