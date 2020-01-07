import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { RosterV1 } from '../data/version1/RosterV1';
import { IRostersController } from './IRostersController';
export declare class RostersController implements IConfigurable, IReferenceable, ICommandable, IRostersController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getRosters(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RosterV1>) => void): void;
    getRosterById(correlationId: string, id: string, callback: (err: any, roster: RosterV1) => void): void;
    private fixRoster;
    createRoster(correlationId: string, roster: RosterV1, callback: (err: any, roster: RosterV1) => void): void;
    updateRoster(correlationId: string, roster: RosterV1, callback: (err: any, roster: RosterV1) => void): void;
    deleteRosterById(correlationId: string, id: string, callback: (err: any, roster: RosterV1) => void): void;
}
