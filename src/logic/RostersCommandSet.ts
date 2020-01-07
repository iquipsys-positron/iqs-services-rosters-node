import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { RosterV1 } from '../data/version1/RosterV1';
import { RosterV1Schema } from '../data/version1/RosterV1Schema';
import { IRostersController } from './IRostersController';

export class RostersCommandSet extends CommandSet {
    private _logic: IRostersController;

    constructor(logic: IRostersController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetRostersCommand());
		this.addCommand(this.makeGetRosterByIdCommand());
		this.addCommand(this.makeCreateRosterCommand());
		this.addCommand(this.makeUpdateRosterCommand());
		this.addCommand(this.makeDeleteRosterByIdCommand());
    }

	private makeGetRostersCommand(): ICommand {
		return new Command(
			"get_rosters",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getRosters(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetRosterByIdCommand(): ICommand {
		return new Command(
			"get_roster_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('roster_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let roster_id = args.getAsString("roster_id");
                this._logic.getRosterById(correlationId, roster_id, callback);
            }
		);
	}

	private makeCreateRosterCommand(): ICommand {
		return new Command(
			"create_roster",
			new ObjectSchema(true)
				.withRequiredProperty('roster', new RosterV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let roster = args.get("roster");
                this._logic.createRoster(correlationId, roster, callback);
            }
		);
	}

	private makeUpdateRosterCommand(): ICommand {
		return new Command(
			"update_roster",
			new ObjectSchema(true)
				.withRequiredProperty('roster', new RosterV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let roster = args.get("roster");
                this._logic.updateRoster(correlationId, roster, callback);
            }
		);
	}
	
	private makeDeleteRosterByIdCommand(): ICommand {
		return new Command(
			"delete_roster_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('roster_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let rosterId = args.getAsNullableString("roster_id");
                this._logic.deleteRosterById(correlationId, rosterId, callback);
			}
		);
	}

}