import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header/header.component";
import {QuoteModalComponent} from "./quote-modal/quote-modal.component";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        HeaderComponent,
        QuoteModalComponent
    ],
    exports: [
        HeaderComponent
    ],
    entryComponents: [
        QuoteModalComponent
    ]
})
export class SharedModule {}
