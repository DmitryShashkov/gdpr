import {Component} from "@angular/core";
import {PlatformType} from "../../../app.types";
import {Router} from "@angular/router";
import {RoutingContract} from "../../../contracts/routing.contract";
import {PLATFORM_TYPES} from "../../../app.constants";
import {DisplayLoadingDTO} from "../../../services/services.dto";
import {LoadingService} from "../../../services/loading.service";
import {StorageService} from "../../../services/storage.service";
import {StorageContract} from "../../../contracts/storage.contract";

@Component({
    selector: 'choose-platform',
    templateUrl: './choose-platform.component.html',
    styleUrls: ['./choose-platform.component.scss']
})
export class ChoosePlatformComponent {
    public readonly PLATFORM_TYPES: typeof PLATFORM_TYPES = PLATFORM_TYPES;

    constructor (
        private router: Router,
        private loadingService: LoadingService,
        private storageService: StorageService
    ) { }

    public async choosePlatform (platformType: PlatformType) : Promise<boolean> {
        this.storageService.save(StorageContract.SELECTED_PLATFORM_TYPE, platformType);

        const loadingDTO: DisplayLoadingDTO = {
            displayTime: 2000,
            displayText: 'One moment, please. The check list of questions for the Mobile/Web platform is being created.'
        };
        await this.loadingService.displayLoading(loadingDTO);

        const questionsCommands: string[] = [`/${RoutingContract.QUESTIONS}`];
        return this.router.navigate(questionsCommands);
    }
}
