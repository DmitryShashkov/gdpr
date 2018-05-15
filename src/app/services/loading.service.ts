import {ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from "@angular/core";
import {DisplayLoadingDTO} from "./services.dto";
import {LoadingComponent} from "../components/shared/loading/loading.component";

@Injectable()
export class LoadingService {
    private isInitialized: boolean = false;

    private loadingFactory: ComponentFactory<LoadingComponent>;
    private loadingComponent: ComponentRef<LoadingComponent>;

    constructor (
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
    }

    public init (container: ViewContainerRef) : void {
        if (this.isInitialized) {
            throw new Error('\'LoadingService\' must only be initialized once');
        }

        this.loadingComponent = container.createComponent(this.loadingFactory);

        this.isInitialized = true;
    }

    public async displayLoading (dto: DisplayLoadingDTO = {}) : Promise<void> {
        const displayTime: number = dto.displayTime || 100;

        this.loadingComponent.instance.loadingText = dto.displayText || 'Loading...';
        this.loadingComponent.instance.isVisible = true;

        return new Promise<void>((resolve: Function) => {
            setTimeout(() => {
                this.loadingComponent.instance.isVisible = false;
                return resolve();
            }, displayTime);
        });
    }

    public startLoading (text: string = 'Loading...') : void {
        this.loadingComponent.instance.loadingText = text;
        this.loadingComponent.instance.isVisible = true;
    }

    public stopLoading () : void {
        this.loadingComponent.instance.isVisible = false;
    }
}
