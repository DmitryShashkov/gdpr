import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AnimatedContentDirective} from "./animated-content.directive";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AnimatedContentDirective
    ],
    exports: [
        AnimatedContentDirective
    ]
})
export class DirectivesModule {}
