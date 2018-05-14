import {AfterContentInit, AfterViewInit, Component, OnInit} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PARTICLES_SETTINGS} from "../../../app.particles.settings";
import {QuoteRequestDTO} from "../../../services/services.dto";
import {StorageService} from "../../../services/storage.service";
import {StorageContract} from "../../../contracts/storage.contract";
import {GeoCheckService} from "../../../services/geo-check.service";
import {HttpService} from "../../../services/http.service";

// todo: refactor this
@Component({
    selector: 'quote-modal',
    templateUrl: './quote-modal.component.html',
    styleUrls: ['./quote-modal.component.scss']
})
export class QuoteModalComponent implements AfterViewInit {
    public readonly STAGES = {
        FORM: 'form',
        LOADING: 'loading',
        RESULT: 'result'
    };

    public currentStage: string = this.STAGES.FORM;
    // public currentUrl: string = this.router.url.split('/')[2];
    // public isAnimatedCube: boolean = false;
    // public isContentShow: boolean = true;
    // public isMessageShow: boolean = false;
    // public isResultPage: number = this.router.url.indexOf('result');
    // public placeholder: string;

    public requestForm: FormGroup;

    constructor (
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private storageService: StorageService,
        private httpService: HttpService,
        // private router: Router,
        // private route: ActivatedRoute,
        private geoCheckService: GeoCheckService
    ) {
        this.requestForm = this.fb.group({
            name: [ '', [ Validators.required ] ],
            email: [ '', [ Validators.email ] ],
            projectDetails: [ '', Validators.required ]
        });
    }

    ngAfterViewInit () {
        window.requestAnimationFrame(() => {
            particlesJS('modal-particles', PARTICLES_SETTINGS)
        });
    }

    public async submitForm () : Promise<void> {
        for (let controlName in this.requestForm.controls) {
            const control: AbstractControl = this.requestForm.controls[controlName];
            control.markAsTouched();
        }

        if (this.requestForm.invalid) { return; }

        let payload: QuoteRequestDTO = this.requestForm.value;

        payload.firstCameFrom = this.storageService.read(StorageContract.FIRST_CAME_FROM);
        payload.lastCameFrom = this.storageService.read(StorageContract.LAST_CAME_FROM);
        payload.suggestedCountry = this.geoCheckService.suggestedUserCountry;
        payload.conversionPage = window.location.href;

        this.currentStage = this.STAGES.LOADING;

        // try {
        //     await this.httpService.requestQuote(payload);
        // } catch (exc) {
        //     console.log(exc);
        // }

        // todo: go to next stages
        // this.isAnimatedCube = false;
        // this.isMessageShow = true;
        // setTimeout(() => {
        //     this.bsModalRef.hide();
        // }, 2000);
    }

    // save (data) {
    //     this.isContentShow = false;
    //     this.isAnimatedCube = true;
    //
    //     data.firstCameFrom = sessionStorage.getItem('firstCameFrom');
    //     data.lastCameFrom = sessionStorage.getItem('lastCameFrom');
    //     // data.suggestedCountry = this.geoCheckService.suggestedUserCountry;
    //     data.conversionPage = window.location.href;
    //
    //     if(this.currentUrl){
    //         data.url = this.currentUrl;
    //         // this.httpService.saveCalculatorEstimates(data).subscribe(
    //         //     (res: any) => {
    //         //         this.isAnimatedCube = false;
    //         //         this.isMessageShow = true;
    //         //         setTimeout(() => {
    //         //             this.bsModalRef.hide();
    //         //         }, 2000);
    //         //     });
    //     } else{
    //         // this.httpService.saveEstimates(data).subscribe(
    //         //     (res: any) => {
    //         //         this.isAnimatedCube = false;
    //         //         this.isMessageShow = true;
    //         //         setTimeout(() => {
    //         //             this.bsModalRef.hide();
    //         //         }, 2000);
    //         //     });
    //     }
    //
    //     // Analytics.send({
    //     //     google: ['button', 'order', 'calculator'],
    //     //     yandex: 'order-from-calculator'
    //     // });
    // }
}
