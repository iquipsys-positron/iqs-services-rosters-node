"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const RostersMongoDbPersistence_1 = require("../persistence/RostersMongoDbPersistence");
const RostersFilePersistence_1 = require("../persistence/RostersFilePersistence");
const RostersMemoryPersistence_1 = require("../persistence/RostersMemoryPersistence");
const RostersController_1 = require("../logic/RostersController");
const RostersHttpServiceV1_1 = require("../services/version1/RostersHttpServiceV1");
class RostersServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(RostersServiceFactory.MemoryPersistenceDescriptor, RostersMemoryPersistence_1.RostersMemoryPersistence);
        this.registerAsType(RostersServiceFactory.FilePersistenceDescriptor, RostersFilePersistence_1.RostersFilePersistence);
        this.registerAsType(RostersServiceFactory.MongoDbPersistenceDescriptor, RostersMongoDbPersistence_1.RostersMongoDbPersistence);
        this.registerAsType(RostersServiceFactory.ControllerDescriptor, RostersController_1.RostersController);
        this.registerAsType(RostersServiceFactory.HttpServiceDescriptor, RostersHttpServiceV1_1.RostersHttpServiceV1);
    }
}
exports.RostersServiceFactory = RostersServiceFactory;
RostersServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-rosters", "factory", "default", "default", "1.0");
RostersServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-rosters", "persistence", "memory", "*", "1.0");
RostersServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-rosters", "persistence", "file", "*", "1.0");
RostersServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-rosters", "persistence", "mongodb", "*", "1.0");
RostersServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-rosters", "controller", "default", "*", "1.0");
RostersServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-rosters", "service", "http", "*", "1.0");
//# sourceMappingURL=RostersServiceFactory.js.map