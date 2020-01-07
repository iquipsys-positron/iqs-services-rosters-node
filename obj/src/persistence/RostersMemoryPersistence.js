"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class RostersMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.RostersMemoryPersistence = RostersMemoryPersistence;
//# sourceMappingURL=RostersMemoryPersistence.js.map