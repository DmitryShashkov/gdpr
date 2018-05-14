import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {COMMON_ANSWERS, PLATFORM_TYPES} from "../../../app.constants";
import {QuestionsService} from "../../../services/questions.service";
import {PlatformType, Question} from "../../../app.types";
import {StorageService} from "../../../services/storage.service";

@Component({
    selector: 'results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public yourRating: number;
    public maxRating: number;

    public readonly RESOLUTIONS = {
        DECENT: 'decent',
        ACCEPTABLE: 'acceptable',
        POOR: 'poor'
    };
    public yourResolution: string;

    public recommendations: string[] = [];

    public selectedPlatform: PlatformType;

    constructor (
        private route: ActivatedRoute,
        private questionsService: QuestionsService,
        private storageService: StorageService
    ) { }

    public ngOnInit ()  {
        // todo: get this from resolver too
        this.selectedPlatform = PLATFORM_TYPES.WEB;

        this.route.data.subscribe((data: { answers: string[] }) => {
            this.yourRating = data.answers.filter((answer) => answer === COMMON_ANSWERS.YES).length;
            this.maxRating = data.answers.length;

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
                .filter((question: Question, i: number) => data.answers[i] === COMMON_ANSWERS.NO)
                .map((question: Question) => question.suggestions)
                .reduce((previous: string[], current: string[]) => previous.concat(current), []);
        });
    }
}
