import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {COMMON_ANSWERS, PLATFORM_TYPES, RESOLUTIONS} from "../../../app.constants";
import {QuestionsService} from "../../../services/questions.service";
import {PlatformType, Question} from "../../../app.types";
import {StorageService} from "../../../services/storage.service";
import {RoutingContract} from "../../../contracts/routing.contract";
import {LoadingService} from "../../../services/loading.service";
import {AnswersSet} from "../../../services/services.dto";
import {FacebookService, UIParams} from "ngx-facebook";
import {environment} from "../../../../environments/environment";
import {AppUtils} from "../../../app.utils";

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public yourRating: number;
    public maxRating: number;

    public readonly RESOLUTIONS: typeof RESOLUTIONS = RESOLUTIONS;
    public yourResolution: string;

    public recommendations: string[] = [];

    public readonly PLATFORM_TYPES: typeof PLATFORM_TYPES = PLATFORM_TYPES;
    public selectedPlatform: PlatformType;

    public twitterIntentURL: string = AppUtils.buildTwitterShareLink({
        text: 'Try the GDPR Checklist to find out how to prepare for GDPR compliance requirements!',
        url: 'https://www.cleveroad.com/gdpr-compliance-checklist/',
        via: 'cleveroad'
    });

    constructor (
        private route: ActivatedRoute,
        private router: Router,
        private questionsService: QuestionsService,
        private loadingService: LoadingService,
        private facebookService: FacebookService
    ) {
        this.facebookService.init({
            appId: environment.fbAppId,
            xfbml: true,
            version: 'v2.10'
        });
    }

    public ngOnInit ()  {
        window.requestAnimationFrame(this.loadingService.stopLoading.bind(this.loadingService));

        this.route.data.subscribe((resolvedData: { answersSet: AnswersSet }) => {
            this.selectedPlatform = resolvedData.answersSet.platform as PlatformType;

            this.yourRating = resolvedData.answersSet.answers.filter((answer) => answer === COMMON_ANSWERS.YES + '').length;
            this.maxRating = resolvedData.answersSet.answers.length;

            const ratingFraction: number = this.yourRating / this.maxRating;
            if (ratingFraction < 0.4) {
                this.yourResolution = this.RESOLUTIONS.POOR;
            } else if (ratingFraction > 0.9) {
                this.yourResolution = this.RESOLUTIONS.DECENT;
            } else {
                this.yourResolution = this.RESOLUTIONS.ACCEPTABLE;
            }

            const questions: Question[] = this.questionsService.getQuestions(this.selectedPlatform);

            this.recommendations = questions
                .filter((question: Question, i: number) => resolvedData.answersSet.answers[i] === COMMON_ANSWERS.NO + '')
                .map((question: Question) => question.suggestions)
                .reduce((previous: string[], current: string[]) => previous.concat(current), []);
        });
    }

    public goBack () : Promise<boolean> {
        const commands = [`/${RoutingContract.QUESTIONS}`];
        return this.router.navigate(commands);
    }

    public shareViaFacebook () : void {
        let params: UIParams = {
            quote: 'Are you ready for General Data Protection Regulation (GDPR)? Tick the points in GDPR Checklist to know for sure!',
            href: 'https://www.cleveroad.com/gdpr-compliance-checklist/',
            method: 'share'
        };

        this.facebookService.ui(params)
            .then(console.log).catch(console.log);
    }
}
