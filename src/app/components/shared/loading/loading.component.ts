import {AfterViewInit, Component} from "@angular/core";
import {PARTICLES_SETTINGS} from "../../../app.particles.settings";

@Component({
    selector: 'loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements AfterViewInit {
    public isVisible: boolean = false;

    public loadingText: string;

    constructor () {}

    public ngAfterViewInit () : void {
        particlesJS('loading-particles', PARTICLES_SETTINGS);
    }
}
