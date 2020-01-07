import { IStringIdentifiable } from 'pip-services3-commons-node';
import { RosterObjectV1 } from './RosterObjectV1';
export declare class RosterV1 implements IStringIdentifiable {
    id: string;
    site_id: string;
    name?: string;
    shift_id?: string;
    start_time: Date;
    end_time: Date;
    objects?: RosterObjectV1[];
}
