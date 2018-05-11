import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        // the 'AppServerModule' should import our 'AppModule' followed
        // by the 'ServerModule' from '@angular/platform-server'
        AppModule,
        ServerModule,
        ModuleMapLoaderModule,
        ServerTransferStateModule,
    ],
    // since the bootstrapped component is not inherited from our
    // imported 'AppModule', it needs to be repeated here
    bootstrap: [ AppComponent ],
})
export class AppServerModule { }
