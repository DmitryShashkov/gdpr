import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class ResultsResolver implements Resolve<string[]> {
    constructor () {}

    public async resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<string[]> {
        return new Promise<string[]>((resolve) => {
            return resolve(['no','no','no','no','no','no','no','no','no','no']);
        });
    }
}
