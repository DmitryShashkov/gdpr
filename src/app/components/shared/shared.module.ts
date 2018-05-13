import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {QuoteModalComponent} from "./quote-modal/quote-modal.component";
import {FormsModule} from "@angular/forms";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {LoadingComponent} from "./loading/loading.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        QuoteModalComponent,
        ProgressBarComponent,
        LoadingComponent
    ],
    exports: [
        HeaderComponent,
        ProgressBarComponent
    ],
    entryComponents: [
        QuoteModalComponent,
        LoadingComponent
    ]
})
export class SharedModule {}
