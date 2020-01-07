"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class RosterObjectV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('object_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('assign_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('start_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('end_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('planned', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('actual', pip_services3_commons_node_2.TypeCode.Boolean);
    }
}
exports.RosterObjectV1Schema = RosterObjectV1Schema;
//# sourceMappingURL=RosterObjectV1Schema.js.map