import { ConfigParams } from 'pip-services3-commons-node';

import { RostersMemoryPersistence } from '../../src/persistence/RostersMemoryPersistence';
import { RostersPersistenceFixture } from './RostersPersistenceFixture';

suite('RostersMemoryPersistence', ()=> {
    let persistence: RostersMemoryPersistence;
    let fixture: RostersPersistenceFixture;
    
    setup((done) => {
        persistence = new RostersMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new RostersPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});