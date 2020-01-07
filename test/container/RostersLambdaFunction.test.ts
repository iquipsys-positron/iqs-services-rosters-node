let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { RosterV1 } from '../../src/data/version1/RosterV1';
import { RostersMemoryPersistence } from '../../src/persistence/RostersMemoryPersistence';
import { RostersController } from '../../src/logic/RostersController';
import { RostersLambdaFunction } from '../../src/container/RostersLambdaFunction';
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

suite('RostersLambdaFunction', ()=> {
    let lambda: RostersLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-rosters:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-rosters:controller:default:default:1.0'
        );

        lambda = new RostersLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var roster1, roster2;

        async.series([
        // Create one roster
            (callback) => {
                lambda.act(
                    {
                        role: 'rosters',
                        cmd: 'create_roster',
                        roster: ROSTER1
                    },
                    (err, roster) => {
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
                lambda.act(
                    {
                        role: 'rosters',
                        cmd: 'create_roster',
                        roster: ROSTER2
                    },
                    (err, roster) => {
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
                lambda.act(
                    {
                        role: 'rosters',
                        cmd: 'get_rosters' 
                    },
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

                lambda.act(
                    {
                        role: 'rosters',
                        cmd: 'update_roster',
                        roster: roster1
                    },
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
                lambda.act(
                    {
                        role: 'rosters',
                        cmd: 'delete_roster_by_id',
                        roster_id: roster1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete roster
            (callback) => {
                lambda.act(
                    {
                        role: 'rosters',
                        cmd: 'get_roster_by_id',
                        roster_id: roster1.id
                    },
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isNull(roster || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});