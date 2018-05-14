import {NgModule} from "@angular/core";
import {SharedModule} from "../components/shared/shared.module";
import {LoadingService} from "./loading.service";
import {QuestionsService} from "./questions.service";
import {StorageService} from "./storage.service";
import {HttpService} from "./http.service";
import {GeoCheckService} from "./geo-check.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    imports: [
        SharedModule,
        HttpClientModule
    ],
    providers: [
        LoadingService,
        QuestionsService,
        StorageService,
        HttpService,
        GeoCheckService
    ]
})
export class ServicesModule {}
