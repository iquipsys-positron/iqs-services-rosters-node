"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class RostersMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('rosters');
        super.ensureIndex({ site_id: 1, start_time: -1, end_time: -1 });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let site_id = filter.getAsNullableString('site_id');
        if (site_id != null)
            criteria.push({ site_id: site_id });
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.RostersMongoDbPersistence = RostersMongoDbPersistence;
//# sourceMappingURL=RostersMongoDbPersistence.js.map