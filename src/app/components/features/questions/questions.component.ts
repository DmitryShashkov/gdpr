import {Component, OnInit} from "@angular/core";
import {StorageService} from "../../../services/storage.service";
import {PlatformType, Question} from "../../../app.types";
import {StorageContract} from "../../../contracts/storage.contract";
import {PLATFORM_TYPES} from "../../../app.constants";
import {QuestionsService} from "../../../services/questions.service";
import {Router} from "@angular/router";
import {RoutingContract} from "../../../contracts/routing.contract";
import {LoadingService} from "../../../services/loading.service";

@Component({
    selector: 'questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
    public questions: Question[];

    public currentQuestionIndex: number;

    public answers: string[];

    constructor (
        private router: Router,
        private storageService: StorageService,
        private questionsService: QuestionsService,
        private loadingService: LoadingService
    ) {}

    public ngOnInit () : void {
        const platformType: PlatformType =
            this.storageService.read(StorageContract.SELECTED_PLATFORM_TYPE)
            || PLATFORM_TYPES.WEB;

        this.questions = this.questionsService.getQuestions(platformType);

        this.answers = this.storageService.read(StorageContract.CURRENT_ANSWERS_SET) || [];

        this.currentQuestionIndex = Math.min(this.answers.length, this.questions.length - 1);
    }

    public async answerCurrentQuestion (answerOption: string) : Promise<void> {
        this.answers.push(answerOption);
        this.answers = this.answers.slice(0);

        this.currentQuestionIndex++;

        this.storageService.save(StorageContract.CURRENT_ANSWERS_SET, this.answers);

        if (this.currentQuestionIndex >= this.questions.length) {
            await this.loadingService.displayLoading({
                displayText: 'Preparing results...',
                displayTime: 2000
            });

            // noinspection JSIgnoredPromiseFromCall
            this.router.navigate([`/${RoutingContract.RESULTS}`]);
        }
    }

    public goBack () : void {
        this.answers.pop();
        this.answers = this.answers.slice(0);

        this.currentQuestionIndex--;

        this.storageService.save(StorageContract.CURRENT_ANSWERS_SET, this.answers);

        if (this.currentQuestionIndex < 0) {
            // noinspection JSIgnoredPromiseFromCall
            this.router.navigate(['/']);
        }
    }

    public goToQuestion (questionIndex: number) : void {
        this.answers.splice(questionIndex);
        this.answers = this.answers.slice(0);

        this.currentQuestionIndex = questionIndex;

        this.storageService.save(StorageContract.CURRENT_ANSWERS_SET, this.answers);
    }
}
