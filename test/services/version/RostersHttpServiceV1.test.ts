let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RosterV1 } from '../../../src/data/version1/RosterV1';
import { RostersMemoryPersistence } from '../../../src/persistence/RostersMemoryPersistence';
import { RostersController } from '../../../src/logic/RostersController';
import { RostersHttpServiceV1 } from '../../../src/services/version1/RostersHttpServiceV1';
import { RosterObjectV1 } from '../../../src/data/version1/RosterObjectV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let now = new Date();


let ROSTER_OBJ1: RosterObjectV1 = {
    end_time: new Date(),
    start_time: new Date(),
    actual: true,
    planned: false,
    assign_id: "123",
    object_id: "321"
};

let ROSTER_OBJ2: RosterObjectV1 = {
    end_time: new Date(),
    start_time: new Date(),
    actual: true,
    planned: false,
    assign_id: "123",
    object_id: "321"
}

let ROSTER_OBJ3: RosterObjectV1 = {
    end_time: new Date(),
    start_time: new Date(),
    actual: true,
    planned: false,
    assign_id: "123",
    object_id: "321"
};

let ROSTER1: RosterV1 = {
    id: '1',
    site_id: '1',
    name: 'Test roster 1',
    start_time: new Date(now.getTime()),
    end_time: new Date(now.getTime() + 8 * 3600000),
    objects: [ROSTER_OBJ1]
};
let ROSTER2: RosterV1 = {
    id: '2',
    site_id: '1',
    name: 'Test roster 2',
    start_time: new Date(now.getTime()),
    end_time: new Date(now.getTime() + 8 * 3600000),
    objects: [ROSTER_OBJ1, ROSTER_OBJ2]
};

let toTime = new Date(now.getTime() + 8 * 3600000);

let ROSTER3: RosterV1 = {
    id: '3',
    site_id: '2',
    name: 'Test roster 3',
    start_time: new Date(now.getTime() + 8 * 3600000),
    end_time: new Date(now.getTime() + 16 * 3600000),
    objects: [ROSTER_OBJ3]
};

suite('RostersHttpServiceV1', ()=> {    
    let service: RostersHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new RostersMemoryPersistence();
        let controller = new RostersController();

        service = new RostersHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-rosters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-rosters', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-rosters', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let roster1, roster2;

        async.series([
        // Create one roster
            (callback) => {
                rest.post('/v1/rosters/create_roster',
                    {
                        roster: ROSTER1
                    },
                    (err, req, res, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.site_id, ROSTER1.site_id);
                        assert.equal(roster.name, ROSTER1.name);

                        roster1 = roster;

                        callback();
                    }
                );
            },
        // Create another roster
            (callback) => {
                rest.post('/v1/rosters/create_roster', 
                    {
                        roster: ROSTER2
                    },
                    (err, req, res, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.site_id, ROSTER2.site_id);
                        assert.equal(roster.name, ROSTER2.name);

                        roster2 = roster;

                        callback();
                    }
                );
            },
        // Get all rosters
            (callback) => {
                rest.post('/v1/rosters/get_rosters',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the roster
            (callback) => {
                roster1.name = 'Updated roster 1';

                rest.post('/v1/rosters/update_roster',
                    { 
                        roster: roster1
                    },
                    (err, req, res, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.name, 'Updated roster 1');
                        assert.equal(roster.id, ROSTER1.id);

                        roster1 = roster;

                        callback();
                    }
                );
            },
        // Delete roster
            (callback) => {
                rest.post('/v1/rosters/delete_roster_by_id',
                    {
                        roster_id: roster1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete roster
            (callback) => {
                rest.post('/v1/rosters/get_roster_by_id',
                    {
                        roster_id: roster1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});