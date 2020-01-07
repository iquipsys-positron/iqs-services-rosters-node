let _ = require('lodash');
let async = require('async');
let geojson = require('geojson-utils');
let moment = require('moment');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { RosterV1 } from '../data/version1/RosterV1';
import { IRostersPersistence } from '../persistence/IRostersPersistence';
import { IRostersController } from './IRostersController';
import { RostersCommandSet } from './RostersCommandSet';

export class RostersController implements  IConfigurable, IReferenceable, ICommandable, IRostersController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-rosters:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(RostersController._defaultConfig);
    private _persistence: IRostersPersistence;
    private _commandSet: RostersCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IRostersPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new RostersCommandSet(this);
        return this._commandSet;
    }
    
    public getRosters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<RosterV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getRosterById(correlationId: string, id: string, 
        callback: (err: any, roster: RosterV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    private fixRoster(roster: RosterV1): void {
        roster.start_time = DateTimeConverter.toNullableDateTime(roster.start_time);
        roster.end_time = DateTimeConverter.toNullableDateTime(roster.end_time);

        // Now date can start at any time according to organization time zone
        // if (roster.shift_id == null && roster.start_time != null) {
        //     let t = moment.utc(roster.start_time).startOf('day');
        //     roster.start_time = t.toDate();
        //     roster.end_time = t.add(1, 'days').toDate();
        // }
    }

    public createRoster(correlationId: string, roster: RosterV1, 
        callback: (err: any, roster: RosterV1) => void): void {
        this.fixRoster(roster);
        this._persistence.create(correlationId, roster, callback);
    }

    public updateRoster(correlationId: string, roster: RosterV1, 
        callback: (err: any, roster: RosterV1) => void): void {
        this.fixRoster(roster);
        this._persistence.update(correlationId, roster, callback);
    }

    public deleteRosterById(correlationId: string, id: string,
        callback: (err: any, roster: RosterV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
