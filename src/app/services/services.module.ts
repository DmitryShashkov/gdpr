import {NgModule} from "@angular/core";
import {SharedModule} from "../components/shared/shared.module";
import {LoadingService} from "./loading.service";
import {QuestionsService} from "./questions.service";
import {StorageService} from "./storage.service";

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        LoadingService,
        QuestionsService,
        StorageService
    ]
})
export class ServicesModule {}
