import {Injectable} from "@angular/core";
import {PlatformType, Question} from "../app.types";
import {COMMON_ANSWERS, PLATFORM_TYPES} from "../app.constants";

// shortcuts
const YES: string = COMMON_ANSWERS.YES as string;
const NO: string = COMMON_ANSWERS.NO as string;

@Injectable()
export class QuestionsService {
    private readonly questions: { [key: string]: Question[] } = {
        [PLATFORM_TYPES.WEB]: [
            {
                text: 'Do you allow users to register with their email address?',
                answers: [YES, NO],
                suggestions: ['Allow users to register with their email address']
            },
            {
                text: 'Do you force users to read Terms and Conditions or Privacy Policy and agree with them before they are registered?',
                answers: [YES, NO],
                suggestions: ['Force users to read Terms and Conditions or Privacy Policy and agree with them before they are registered']
            },
            {
                text: 'Do you alert underaged users before letting them to your website?',
                answers: [YES, NO],
                suggestions: ['Alert underaged users before letting them to your website']
            },
            {
                text: 'Do you allow users to edit their personal data?',
                answers: [YES, NO],
                suggestions: ['Allow users to edit their personal data']
            },
            {
                text: 'Do you allow users to export their personal data?',
                answers: [YES, NO],
                suggestions: ['Allow users to export their personal data']
            },
            {
                text: 'Can users freeze their account?',
                answers: [YES, NO],
                suggestions: ['Let users freeze their account']
            },
            {
                text: 'Do you let users unfreeze their account?',
                answers: [YES, NO],
                suggestions: ['Let users unfreeze their account']
            },
            {
                text: 'Do you allow users to delete their account?',
                answers: [YES, NO],
                suggestions: ['Let users delete their account']
            },
            {
                text: 'Do you let users read Terms & Conditions whenever they wish?',
                answers: [YES, NO],
                suggestions: ['Let users read Terms & Conditions whenever they wish']
            },
            {
                text: 'Do you renew the consent every 12 months?',
                answers: [YES, NO],
                suggestions: ['Renew the consent']
            }
        ],
        [PLATFORM_TYPES.MOBILE]: [
            {
                text: 'Do you allow users to register with their email address?',
                answers: [YES, NO],
                suggestions: ['Allow users to register with their email address']
            },
            {
                text: 'Do you force users to read Terms and Conditions or Privacy Policy and agree with them before they are registered?',
                answers: [YES, NO],
                suggestions: ['Force users to read Terms and Conditions or Privacy Policy and agree with them before they are registered']
            },
            {
                text: 'Do you alert underaged users before letting them to your app?',
                answers: [YES, NO],
                suggestions: ['Alert underaged users before letting them to your app']
            },
            {
                text: 'Do you allow users to edit their personal data?',
                answers: [YES, NO],
                suggestions: ['Allow users to edit their personal data']
            },
            {
                text: 'Do you allow users to export their personal data?',
                answers: [YES, NO],
                suggestions: ['Allow users to export their personal data']
            },
            {
                text: 'Can users freeze their account?',
                answers: [YES, NO],
                suggestions: ['Let users freeze their account']
            },
            {
                text: 'Do you let users unfreeze their account?',
                answers: [YES, NO],
                suggestions: ['Let users unfreeze their account']
            },
            {
                text: 'Do you allow users to delete their account?',
                answers: [YES, NO],
                suggestions: ['Let users delete their account']
            },
            {
                text: 'Do you let users read Terms & Conditions whenever they wish?',
                answers: [YES, NO],
                suggestions: ['Let users read Terms & Conditions whenever they wish']
            },
            {
                text: 'Do you renew the consent every 12 months?',
                answers: [YES, NO],
                suggestions: ['Renew the consent']
            }
        ]
    };

    constructor () {}

    public getQuestions (platformType: PlatformType) : Question[] {
        return this.questions[platformType];
    }
}
