let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { RosterV1 } from '../../src/data/version1/RosterV1';

import { IRostersPersistence } from '../../src/persistence/IRostersPersistence';
import { RosterObjectV1 } from '../../src';

let fromTime = new Date();

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
    start_time: new Date(fromTime.getTime()),
    end_time: new Date(fromTime.getTime() + 8 * 3600000),
    objects: [ROSTER_OBJ1, ROSTER_OBJ2]
};
let ROSTER2: RosterV1 = {
    id: '2',
    site_id: '1',
    name: 'Test roster 2',
    start_time: new Date(fromTime.getTime()),
    end_time: new Date(fromTime.getTime() + 8 * 3600000),
    objects: [ROSTER_OBJ2]
};

let toTime = new Date(fromTime.getTime() + 8 * 3600000);

let ROSTER3: RosterV1 = {
    id: '3',
    site_id: '2',
    name: 'Test roster 3',
    start_time: new Date(fromTime.getTime() + 8 * 3600000),
    end_time: new Date(fromTime.getTime() + 16 * 3600000),
    objects: [ROSTER_OBJ3, ROSTER_OBJ2]
};

export class RostersPersistenceFixture {
    private _persistence: IRostersPersistence;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateRosters(done) {
        async.series([
            // Create one roster
            (callback) => {
                this._persistence.create(
                    null,
                    ROSTER1,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.site_id, ROSTER1.site_id);
                        assert.equal(roster.name, ROSTER1.name);

                        callback();
                    }
                );
            },
            // Create another roster
            (callback) => {
                this._persistence.create(
                    null,
                    ROSTER2,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.site_id, ROSTER2.site_id);
                        assert.equal(roster.name, ROSTER2.name);

                        callback();
                    }
                );
            },
            // Create yet another roster
            (callback) => {
                this._persistence.create(
                    null,
                    ROSTER3,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.site_id, ROSTER3.site_id);
                        assert.equal(roster.name, ROSTER3.name);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testCrudOperations(done) {
        let roster1: RosterV1;

        async.series([
            // Create items
            (callback) => {
                this.testCreateRosters(callback);
            },
            // Get all rosters
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        roster1 = page.data[0];

                        callback();
                    }
                );
            },
            // Update the roster
            (callback) => {
                roster1.name = 'Updated roster 1';

                this._persistence.update(
                    null,
                    roster1,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isObject(roster);
                        assert.equal(roster.name, 'Updated roster 1');
                        assert.equal(roster.id, roster1.id);

                        callback();
                    }
                );
            },
            // Delete roster
            (callback) => {
                this._persistence.deleteById(
                    null,
                    roster1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get delete roster
            (callback) => {
                this._persistence.getOneById(
                    null,
                    roster1.id,
                    (err, roster) => {
                        assert.isNull(err);

                        assert.isNull(roster || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
            // Create rosters
            (callback) => {
                this.testCreateRosters(callback);
            },
            // Get rosters filtered by site_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        site_id: '1'
                    }),
                    new PagingParams(),
                    (err, rosters) => {
                        assert.isNull(err);

                        assert.isObject(rosters);
                        assert.lengthOf(rosters.data, 2);

                        callback();
                    }
                );
            },
            // Get rosters filtered by from/to time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        from_time: fromTime,
                        to_time: toTime
                    }),
                    new PagingParams(),
                    (err, rosters) => {
                        assert.isNull(err);

                        assert.isObject(rosters);
                        assert.lengthOf(rosters.data, 2);

                        callback();
                    }
                );
            },
            // Get rosters filtered by time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        site_id: '1',
                        time: fromTime
                    }),
                    new PagingParams(),
                    (err, rosters) => {
                        assert.isNull(err);

                        assert.isObject(rosters);
                        assert.lengthOf(rosters.data, 2);

                        callback();
                    }
                );
            },
            // Get rosters filtered by time
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        shift: true
                    }),
                    new PagingParams(),
                    (err, rosters) => {
                        assert.isNull(err);

                        assert.isObject(rosters);
                        assert.lengthOf(rosters.data, 0);

                        callback();
                    }
                );
            }
        ], done);
    }

}
