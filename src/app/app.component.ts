import {AfterContentInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {LoadingService} from "./services/loading.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
    @ViewChild('mainContainer', { read: ViewContainerRef })
    private mainContainer: ViewContainerRef;

    constructor (
        private loadingService: LoadingService
    ) {}

    public ngAfterContentInit () : void {
        this.loadingService.init(this.mainContainer);
    }
}
