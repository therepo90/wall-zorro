import {ModuleWithProviders, NgModule} from '@angular/core';
import {LoginComponent} from './containers/login/login.component';
import {AuthService} from './services/auth.service';
import {SharedModule} from '../shared/shared.module';

const components = [LoginComponent];

@NgModule({
    imports: [SharedModule],
    declarations: components,
    exports: components,
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthService
                },
            ],
        };
    }
}
