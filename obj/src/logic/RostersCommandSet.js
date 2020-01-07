"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const RosterV1Schema_1 = require("../data/version1/RosterV1Schema");
class RostersCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetRostersCommand());
        this.addCommand(this.makeGetRosterByIdCommand());
        this.addCommand(this.makeCreateRosterCommand());
        this.addCommand(this.makeUpdateRosterCommand());
        this.addCommand(this.makeDeleteRosterByIdCommand());
    }
    makeGetRostersCommand() {
        return new pip_services3_commons_node_2.Command("get_rosters", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getRosters(correlationId, filter, paging, callback);
        });
    }
    makeGetRosterByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_roster_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('roster_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let roster_id = args.getAsString("roster_id");
            this._logic.getRosterById(correlationId, roster_id, callback);
        });
    }
    makeCreateRosterCommand() {
        return new pip_services3_commons_node_2.Command("create_roster", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('roster', new RosterV1Schema_1.RosterV1Schema()), (correlationId, args, callback) => {
            let roster = args.get("roster");
            this._logic.createRoster(correlationId, roster, callback);
        });
    }
    makeUpdateRosterCommand() {
        return new pip_services3_commons_node_2.Command("update_roster", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('roster', new RosterV1Schema_1.RosterV1Schema()), (correlationId, args, callback) => {
            let roster = args.get("roster");
            this._logic.updateRoster(correlationId, roster, callback);
        });
    }
    makeDeleteRosterByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_roster_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('roster_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let rosterId = args.getAsNullableString("roster_id");
            this._logic.deleteRosterById(correlationId, rosterId, callback);
        });
    }
}
exports.RostersCommandSet = RostersCommandSet;
//# sourceMappingURL=RostersCommandSet.js.map