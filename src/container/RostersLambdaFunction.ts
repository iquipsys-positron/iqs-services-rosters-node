import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { RostersServiceFactory } from '../build/RostersServiceFactory';

export class RostersLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("rosters", "Shift rosters function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-rosters', 'controller', 'default', '*', '*'));
        this._factories.add(new RostersServiceFactory());
    }
}

export const handler = new RostersLambdaFunction().getHandler();