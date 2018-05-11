import {Component} from "@angular/core";
import {BsModalRef} from "ngx-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";

// todo: refactor this
@Component({
    selector: 'quote-modal',
    templateUrl: './quote-modal.component.html',
    styleUrls: ['./quote-modal.component.scss']
})
export class QuoteModalComponent {
    public inputs = {
        name: '',
        email: '',
        projectDetails: ''
    };
    public errors= {
        name: false,
        email: false,
        projectDetails: false
    };
    public currentUrl: string = this.router.url.split('/')[2];
    public isAnimatedCube: boolean = false;
    public isContentShow: boolean = true;
    public isMessageShow: boolean = false;
    public isResultPage: number = this.router.url.indexOf('result');
    public placeholder: string;

    constructor (
        public bsModalRef: BsModalRef,
        // private httpService: HttpService,
        private router: Router,
        private route: ActivatedRoute,
        // private geoCheckService: GeoCheckService
    ) { }

    ngOnInit() {
        this.placeholder = this.isResultPage !== -1 ? "Tell us more about your project (your feature list will be attache)" : "Tell us more about your project";
    }

    ngAfterViewInit() {
        // setTimeout(function () {
        //     particlesJS("particles-container", App.particles.settings);
        // }, 1000);
    }


    submitForm(){
        let isValid = this.validateForm(this.inputs);
        if(isValid){
            this.save(this.inputs);
        }
    }

    save (data) {
        this.isContentShow = false;
        this.isAnimatedCube = true;

        data.firstCameFrom = sessionStorage.getItem('firstCameFrom');
        data.lastCameFrom = sessionStorage.getItem('lastCameFrom');
        // data.suggestedCountry = this.geoCheckService.suggestedUserCountry;
        data.conversionPage = window.location.href;

        if(this.currentUrl){
            data.url = this.currentUrl;
            // this.httpService.saveCalculatorEstimates(data).subscribe(
            //     (res: any) => {
            //         this.isAnimatedCube = false;
            //         this.isMessageShow = true;
            //         setTimeout(() => {
            //             this.bsModalRef.hide();
            //         }, 2000);
            //     });
        } else{
            // this.httpService.saveEstimates(data).subscribe(
            //     (res: any) => {
            //         this.isAnimatedCube = false;
            //         this.isMessageShow = true;
            //         setTimeout(() => {
            //             this.bsModalRef.hide();
            //         }, 2000);
            //     });
        }

        // Analytics.send({
        //     google: ['button', 'order', 'calculator'],
        //     yandex: 'order-from-calculator'
        // });
    }

    public validateForm(inputs): boolean {
        const emailRegExp = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = true;

        if ( !(inputs.email.length && emailRegExp.test(inputs.email)) ) {
            this.errors.email = true;
            result = false;
        } else{
            this.errors.email = false;
        }

        if (!inputs.name.length) {
            this.errors.name = true;
            result = false;
        } else{
            this.errors.name = false;
        }

        if (!inputs.projectDetails.length) {
            this.errors.projectDetails = true;
            result = false;
        } else{
            this.errors.projectDetails = false;
        }

        return result;
    }

}
