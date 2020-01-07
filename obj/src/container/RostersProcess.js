"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const RostersServiceFactory_1 = require("../build/RostersServiceFactory");
class RostersProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("rosters", "Shift rosters microservice");
        this._factories.add(new RostersServiceFactory_1.RostersServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.RostersProcess = RostersProcess;
//# sourceMappingURL=RostersProcess.js.map