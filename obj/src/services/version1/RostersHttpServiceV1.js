"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RostersHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/rosters');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-rosters', 'controller', 'default', '*', '1.0'));
    }
}
exports.RostersHttpServiceV1 = RostersHttpServiceV1;
//# sourceMappingURL=RostersHttpServiceV1.js.map