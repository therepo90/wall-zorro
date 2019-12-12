import { NgModule } from '@angular/core';
import { CommonUiModule } from '../common-ui/common-ui.module';

const modules = [CommonUiModule];

@NgModule({
    declarations: [],
    imports: modules,
    exports: modules,
})
export class SharedModule {}
