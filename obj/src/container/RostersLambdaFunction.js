"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const RostersServiceFactory_1 = require("../build/RostersServiceFactory");
class RostersLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("rosters", "Shift rosters function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-rosters', 'controller', 'default', '*', '*'));
        this._factories.add(new RostersServiceFactory_1.RostersServiceFactory());
    }
}
exports.RostersLambdaFunction = RostersLambdaFunction;
exports.handler = new RostersLambdaFunction().getHandler();
//# sourceMappingURL=RostersLambdaFunction.js.map