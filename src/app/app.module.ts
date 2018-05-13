import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {ChoosePlatformComponent} from "./components/features/choose-platform/choose-platform.component";
import {APP_ROUTES} from "./app.router";
import {SharedModule} from "./components/shared/shared.module";
import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {QuestionsComponent} from "./components/features/questions/questions.component";
import {ServicesModule} from "./services/services.module";
import {DirectivesModule} from "./directives/directives.module";
import {MatRippleModule} from "@angular/material";
import {DisplayGDPRComponent} from "./components/features/display-gdpr/display-gdpr.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ResultsComponent} from "./components/features/results/results.component";

const transitionParams : { appId: string } = { appId: 'my-app' };

@NgModule({
    declarations: [
        AppComponent,
        ChoosePlatformComponent,
        QuestionsComponent,
        DisplayGDPRComponent,
        ResultsComponent
    ],
    imports: [
        SharedModule,
        ServicesModule,
        DirectivesModule,

        MatRippleModule,
        ModalModule.forRoot(),
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        BrowserModule.withServerTransition(transitionParams),

        RouterModule.forRoot(APP_ROUTES)
    ],
    providers: [
        BsModalService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
