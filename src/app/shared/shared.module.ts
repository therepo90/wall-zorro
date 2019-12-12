import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiModule } from '../common-ui/common-ui.module';

const modules = [BrowserModule, BrowserAnimationsModule, CommonUiModule];

@NgModule({
    declarations: [],
    imports: modules,
    exports: modules,
})
export class SharedModule {}
