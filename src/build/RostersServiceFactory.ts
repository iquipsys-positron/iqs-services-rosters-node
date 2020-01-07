import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { RostersMongoDbPersistence } from '../persistence/RostersMongoDbPersistence';
import { RostersFilePersistence } from '../persistence/RostersFilePersistence';
import { RostersMemoryPersistence } from '../persistence/RostersMemoryPersistence';
import { RostersController } from '../logic/RostersController';
import { RostersHttpServiceV1 } from '../services/version1/RostersHttpServiceV1';

export class RostersServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-rosters", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-rosters", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-rosters", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-rosters", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-rosters", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-rosters", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RostersServiceFactory.MemoryPersistenceDescriptor, RostersMemoryPersistence);
		this.registerAsType(RostersServiceFactory.FilePersistenceDescriptor, RostersFilePersistence);
		this.registerAsType(RostersServiceFactory.MongoDbPersistenceDescriptor, RostersMongoDbPersistence);
		this.registerAsType(RostersServiceFactory.ControllerDescriptor, RostersController);
		this.registerAsType(RostersServiceFactory.HttpServiceDescriptor, RostersHttpServiceV1);
	}
	
}
