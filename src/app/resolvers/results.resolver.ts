import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AnswersSet} from "../services/services.dto";
import {HttpService} from "../services/http.service";
import {RoutingContract} from "../contracts/routing.contract";

@Injectable()
export class ResultsResolver implements Resolve<AnswersSet> {
    constructor (
        private httpService: HttpService
    ) { }

    public async resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<AnswersSet> {
        const link: string = route.params[RoutingContract.Params.LINK];
        return this.httpService.getAnswers(link)
    }
}
