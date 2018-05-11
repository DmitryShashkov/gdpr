import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

const transitionParams : { appId: string } = { appId: 'my-app' };

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition(transitionParams),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }