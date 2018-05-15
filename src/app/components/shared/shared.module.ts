import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {QuoteModalComponent} from "./quote-modal/quote-modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {LoadingComponent} from "./loading/loading.component";
import {TransparentBordersComponent} from "./transparent-borders/transparent-borders.component";
import {FooterComponent} from "./footer/footer.component";
import {RateCheckerComponent} from "./rate-checker/rate-checker.component";
import {StarRatingModule} from "angular-star-rating";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StarRatingModule.forRoot(),
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        QuoteModalComponent,
        ProgressBarComponent,
        LoadingComponent,
        TransparentBordersComponent,
        FooterComponent,
        RateCheckerComponent
    ],
    exports: [
        HeaderComponent,
        ProgressBarComponent,
        TransparentBordersComponent,
        FooterComponent,
        RateCheckerComponent
    ],
    entryComponents: [
        QuoteModalComponent,
        LoadingComponent
    ]
})
export class SharedModule {}
