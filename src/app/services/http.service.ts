import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AnswersSet, CommonResponse, QuoteRequestDTO} from "./services.dto";
import {environment} from "../../environments/environment";
import {RateValue} from "../app.types";

@Injectable()
export class HttpService {
    constructor (
        private http: HttpClient
    ) { }

    public async requestQuote (dto: QuoteRequestDTO) : Promise<CommonResponse> {
        const url: string = `${environment.apiServerURL}/api/estimates`;
        return this.http.post<CommonResponse>(url, dto).toPromise();
    }

    public async saveAnswers (platform: string, answers: string[]) : Promise<string> {
        const url: string = `${environment.apiServerURL}/gdpr/answers`;
        const payload = { platform, answers };

        return this.http.post<CommonResponse>(url, payload)
            .map((res: CommonResponse) => res.payload)
            .toPromise();
    }

    public async getAnswers (link: string) : Promise<AnswersSet> {
        const url: string = `${environment.apiServerURL}/gdpr/answers/${link}`;

        return this.http.get<CommonResponse>(url)
            .map((res: CommonResponse) => res.payload)
            .toPromise();
    }

    public async getCheckerRating () : Promise<RateValue> {
        const url: string = `${environment.apiServerURL}/gdpr/rating`;

        return this.http.get<CommonResponse>(url)
            .map((res: CommonResponse) => res.payload)
            .toPromise();
    }

    public voteForChecker (rating: number) : Promise<CommonResponse> {
        const url: string = `${environment.apiServerURL}/gdpr/rating`;
        const payload = { rating };

        return this.http.post<CommonResponse>(url, payload).toPromise();
    }
}
