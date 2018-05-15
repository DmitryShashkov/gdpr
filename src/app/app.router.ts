import {Routes} from "@angular/router";
import {ChoosePlatformComponent} from "./components/features/choose-platform/choose-platform.component";
import {QuestionsComponent} from "./components/features/questions/questions.component";
import {RoutingContract} from "./contracts/routing.contract";
import {ResultsComponent} from "./components/features/results/results.component";
import {ResultsResolver} from "./resolvers/results.resolver";

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
        path: `${RoutingContract.RESULTS}/:${RoutingContract.Params.LINK}`,
        component: ResultsComponent,
        resolve: {
            answersSet: ResultsResolver
        }
    }
];
