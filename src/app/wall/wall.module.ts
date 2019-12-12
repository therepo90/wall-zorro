import { NgModule } from '@angular/core';
import { WallComponent } from './containers/wall/wall.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [WallComponent],
    exports: [WallComponent],
    imports: [SharedModule],
})
export class WallModule {}
