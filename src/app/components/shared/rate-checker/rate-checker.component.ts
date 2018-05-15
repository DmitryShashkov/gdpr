import { Component, OnInit } from '@angular/core';
import {RateValue} from "../../../app.types";
import {StorageService} from "../../../services/storage.service";
import {HttpService} from "../../../services/http.service";

/**
 * Component that displays checker's rating
 * and allows every user to vote for it once
 */
@Component({
    selector: 'rate-checker',
    templateUrl: './rate-checker.component.html',
    styleUrls: ['./rate-checker.component.scss']
})
export class RateCheckerComponent implements OnInit {
    // field in local storage that shows if user has voted already
    private readonly VOTED_KEY: string = '__vcc';

    // maximum possible rating
    public readonly MAX_RATE: number = 5;

    // current statistics (rating + amount of votes)
    public rateValue: RateValue;

    // is user able to vote now? (we actually only depend on local storage,
    // because most users will not clear it, and those who will -
    // aren't going to be able to spam)
    public canVote: boolean = !this.storageService.read<boolean>(this.VOTED_KEY);

    // does user have to see thanksgiving message? (it is shown to him
    // right after successful voting and stays there until page is refreshed)
    public showMessage: boolean = false;

    constructor (
        private httpService: HttpService,
        private storageService: StorageService
    ) { }

    public async ngOnInit () : Promise<void> {
        // getting current rating
        this.rateValue = await this.httpService.getCheckerRating();
    }

    /**
     * Sent user's vote for calculator with specified rating;
     * designed to be called as star rating component's 'click' handler
     */
    public async vote (event: { rating: number }) {
        await this.httpService.voteForChecker(event.rating);
        this.storageService.save(this.VOTED_KEY, true);
        this.showMessage = true;
    }
}
