import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {ChoosePlatformComponent} from "./components/features/choose-platform/choose-platform.component";
import {APP_ROUTES} from "./app.router";
import {SharedModule} from "./components/shared/shared.module";
import {BsModalService, ModalModule} from "ngx-bootstrap";

const transitionParams : { appId: string } = { appId: 'my-app' };

@NgModule({
    declarations: [
        AppComponent,
        ChoosePlatformComponent
    ],
    imports: [
        SharedModule,

        ModalModule.forRoot(),
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
