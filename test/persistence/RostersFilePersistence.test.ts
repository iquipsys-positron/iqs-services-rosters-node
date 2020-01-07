import { ConfigParams } from 'pip-services3-commons-node';

import { RostersFilePersistence } from '../../src/persistence/RostersFilePersistence';
import { RostersPersistenceFixture } from './RostersPersistenceFixture';

suite('RostersFilePersistence', ()=> {
    let persistence: RostersFilePersistence;
    let fixture: RostersPersistenceFixture;
    
    setup((done) => {
        persistence = new RostersFilePersistence('./data/rosters.test.json');

        fixture = new RostersPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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