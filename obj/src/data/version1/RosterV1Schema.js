"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const RosterObjectV1Schema_1 = require("./RosterObjectV1Schema");
class RosterV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('shift_id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('start_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withRequiredProperty('end_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('objects', new pip_services3_commons_node_2.ArraySchema(new RosterObjectV1Schema_1.RosterObjectV1Schema()));
    }
}
exports.RosterV1Schema = RosterV1Schema;
//# sourceMappingURL=RosterV1Schema.js.map