import { CommandSet } from 'pip-services3-commons-node';
import { IRostersController } from './IRostersController';
export declare class RostersCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IRostersController);
    private makeGetRostersCommand;
    private makeGetRosterByIdCommand;
    private makeCreateRosterCommand;
    private makeUpdateRosterCommand;
    private makeDeleteRosterByIdCommand;
}
