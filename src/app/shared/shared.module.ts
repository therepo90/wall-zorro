import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { HttpService } from './services/http.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const modules = [CommonUiModule];

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: modules,
    exports: [...modules, PageNotFoundComponent],
    entryComponents: [PageNotFoundComponent],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [HttpService],
        };
    }
}
