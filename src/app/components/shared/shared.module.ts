import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {QuoteModalComponent} from "./quote-modal/quote-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {LoadingComponent} from "./loading/loading.component";
import {TransparentBordersComponent} from "./transparent-borders/transparent-borders.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HeaderComponent,
        QuoteModalComponent,
        ProgressBarComponent,
        LoadingComponent,
        TransparentBordersComponent
    ],
    exports: [
        HeaderComponent,
        ProgressBarComponent,
        TransparentBordersComponent
    ],
    entryComponents: [
        QuoteModalComponent,
        LoadingComponent
    ]
})
export class SharedModule {}
