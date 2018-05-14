import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommonResponse, QuoteRequestDTO} from "./services.dto";
import {environment} from "../../environments/environment";

@Injectable()
export class HttpService {
    constructor (
        private http: HttpClient
    ) { }

    public async requestQuote (dto: QuoteRequestDTO) : Promise<CommonResponse> {
        const url: string = `${environment.apiServerURL}/api/estimates`;
        return this.http.post<CommonResponse>(url, dto).toPromise();
    }
}
