let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { RosterV1 } from '../../src/data/version1/RosterV1';
import { RostersMemoryPersistence } from '../../src/persistence/RostersMemoryPersistence';
import { RostersController } from '../../src/logic/RostersController';
import { RosterObjectV1 } from '../../src/data/version1/RosterObjectV1';

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
    org_id: '1',
    name: 'Test roster 1',
    start_time: new Date(now.getTime()),
    end_time: new Date(now.getTime() + 8 * 3600000),
    objects: [ROSTER_OBJ1]
};
let ROSTER2: RosterV1 = {
    id: '2',
    org_id: '1',
    name: 'Test roster 2',
    start_time: new Date(now.getTime()),
    end_time: new Date(now.getTime() + 8 * 3600000),
    objects: [ROSTER_OBJ1, ROSTER_OBJ2]
};

let toTime = new Date(now.getTime() + 8 * 3600000);

let ROSTER3: RosterV1 = {
    id: '3',
    org_id: '2',
    name: 'Test roster 3',
    start_time: new Date(now.getTime() + 8 * 3600000),
    end_time: new Date(now.getTime() + 16 * 3600000),
    objects: [ROSTER_OBJ3]
};

suite('RostersController', ()=> {    
    let persistence: RostersMemoryPersistence;
    let controller: RostersController;

    suiteSetup(() => {
        persistence = new RostersMemoryPersistence();
        controller = new RostersController();

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-rosters', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-rosters', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    
    test('CRUD Operations', (done) => {
        let roster1, roster2;

        async.series([
        // Create one roster
            (callback) => {
                controller.createRoster(
                    null, ROSTER1,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.org_id, ROSTER1.org_id);
                        assert.equal(roster.name, ROSTER1.name);

                        roster1 = roster;

                        callback();
                    }
                );
            },
        // Create another roster
            (callback) => {
                controller.createRoster(
                    null, ROSTER2,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.org_id, ROSTER2.org_id);
                        assert.equal(roster.name, ROSTER2.name);

                        roster2 = roster;

                        callback();
                    }
                );
            },
        // Get all rosters
            (callback) => {
                controller.getRosters(
                    null, null, null,
                    (err, page) => {
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

                controller.updateRoster(
                    null, roster1,
                    (err, roster) => {
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
                controller.deleteRosterById(
                    null, roster1.id,
                    (err, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete roster
            (callback) => {
                controller.getRosterById(
                    null, roster1.id,
                    (err, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});