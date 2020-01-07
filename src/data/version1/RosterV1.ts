import { IStringIdentifiable } from 'pip-services3-commons-node';

import { RosterObjectV1 } from './RosterObjectV1';

export class RosterV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public name?: string;
    public shift_id?: string;

    public start_time: Date;
    public end_time: Date;

    public objects?: RosterObjectV1[];
}