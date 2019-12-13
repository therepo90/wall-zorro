import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {StorageModule} from './storage/storage.module';
import {WallModule} from './wall/wall.module';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        HttpClientModule,
        SharedModule.forRoot(),
        AuthModule.forRoot(),
        StorageModule.forRoot(),
        WallModule,
        AppRoutingModule,
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    bootstrap: [AppComponent],
})
export class AppModule {}
