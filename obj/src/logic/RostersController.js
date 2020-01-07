"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let geojson = require('geojson-utils');
let moment = require('moment');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const RostersCommandSet_1 = require("./RostersCommandSet");
class RostersController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(RostersController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new RostersCommandSet_1.RostersCommandSet(this);
        return this._commandSet;
    }
    getRosters(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRosterById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    fixRoster(roster) {
        roster.start_time = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(roster.start_time);
        roster.end_time = pip_services3_commons_node_3.DateTimeConverter.toNullableDateTime(roster.end_time);
        // Now date can start at any time according to site time zone
        // if (roster.shift_id == null && roster.start_time != null) {
        //     let t = moment.utc(roster.start_time).startOf('day');
        //     roster.start_time = t.toDate();
        //     roster.end_time = t.add(1, 'days').toDate();
        // }
    }
    createRoster(correlationId, roster, callback) {
        this.fixRoster(roster);
        this._persistence.create(correlationId, roster, callback);
    }
    updateRoster(correlationId, roster, callback) {
        this.fixRoster(roster);
        this._persistence.update(correlationId, roster, callback);
    }
    deleteRosterById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.RostersController = RostersController;
RostersController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-rosters:persistence:*:*:1.0');
//# sourceMappingURL=RostersController.js.map