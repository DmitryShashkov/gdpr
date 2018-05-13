import {Component, Input, OnChanges} from "@angular/core";
import {COMMON_ANSWERS} from "../../../app.constants";
import {animate, AnimationTriggerMetadata, style, transition, trigger} from "@angular/animations";

const animations: AnimationTriggerMetadata[] = [
    trigger('indexAnimation', [
        transition('void => increased', [
            style({
                transform: 'translateY(-50%) scale(0.5) rotate3d(1,0,0,30deg)',
                opacity: 0
            }),
            animate(
                '0.5s ease-in-out',
                style({
                    transform: 'translateY(0) scale(1) rotate3d(0,0,0,0)',
                    opacity: 1
                })
            )
        ]),
        transition('increased => void', [
            style({
                transform: 'translateY(0) scale(1) rotate3d(0,0,0,0)',
                opacity: 1
            }),
            animate(
                '0.5s ease-in-out',
                style({
                    transform: 'translateY(50%) scale(0.5) rotate3d(1,0,0,-30deg)',
                    opacity: 0
                })
            )
        ]),
        transition('void => decreased', [
            style({
                transform: 'translateY(50%) scale(0.5) rotate3d(1,0,0,-30deg)',
                opacity: 0
            }),
            animate(
                '0.5s ease-in-out',
                style({
                    transform: 'translateY(0) scale(1) rotate3d(0,0,0,0)',
                    opacity: 1
                })
            )
        ]),
        transition('decreased => void', [
            style({
                transform: 'translateY(0) scale(1) rotate3d(0,0,0,0)',
                opacity: 1
            }),
            animate(
                '0.5s ease-in-out',
                style({
                    transform: 'translateY(-50%) scale(0.5) rotate3d(1,0,0,30deg)',
                    opacity: 0
                })
            )
        ])
    ])
];

@Component({
    selector: 'display-gdpr',
    templateUrl: './display-gdpr.component.html',
    styleUrls: ['./display-gdpr.component.scss'],
    animations
})
export class DisplayGDPRComponent implements OnChanges {
    @Input() public questionsCount: number;

    @Input() public userAnswers: string[] = [];

    public implementedFeaturesCount: number;
    public notImplementedFeaturesCount: number;

    public gdprIndex: number;

    public indexState: string = 'same';

    public stateToggle: boolean = true;

    constructor () {}

    public ngOnChanges () : void {
        const previousIndex: number = this.gdprIndex | 0;

        this.implementedFeaturesCount = this.userAnswers
            .filter((answer: string) => answer === COMMON_ANSWERS.YES as string)
            .length;

        this.notImplementedFeaturesCount = this.userAnswers
            .filter((answer: string) => answer === COMMON_ANSWERS.NO as string)
            .length;

        if (this.implementedFeaturesCount > previousIndex) {
            this.indexState = 'increased';
        } else if (this.implementedFeaturesCount < previousIndex) {
            this.indexState = 'decreased';
        } else {
            this.indexState = 'same';
        }

        window.requestAnimationFrame(() => {
            this.stateToggle = !this.stateToggle;
            this.gdprIndex = this.implementedFeaturesCount;
        });
    }
}
