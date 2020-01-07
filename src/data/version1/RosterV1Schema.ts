import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { RosterObjectV1Schema } from './RosterObjectV1Schema';

export class RosterV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('site_id', TypeCode.String);
        this.withOptionalProperty('name', TypeCode.String);
        this.withOptionalProperty('shift_id', TypeCode.String);

        this.withRequiredProperty('start_time', TypeCode.DateTime);
        this.withRequiredProperty('end_time', TypeCode.DateTime);

        this.withOptionalProperty('objects', new ArraySchema(new RosterObjectV1Schema()));
    }
}
