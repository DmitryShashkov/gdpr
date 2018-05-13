import {Routes} from "@angular/router";
import {ChoosePlatformComponent} from "./components/features/choose-platform/choose-platform.component";
import {QuestionsComponent} from "./components/features/questions/questions.component";
import {RoutingContract} from "./contracts/routing.contract";
import {ResultsComponent} from "./components/features/results/results.component";

export const APP_ROUTES: Routes = [
    {
        path: RoutingContract.ROOT,
        component: ChoosePlatformComponent
    },
    {
        path: RoutingContract.QUESTIONS,
        component: QuestionsComponent
    },
    {
        path: RoutingContract.RESULTS,
        component: ResultsComponent
    }
];
