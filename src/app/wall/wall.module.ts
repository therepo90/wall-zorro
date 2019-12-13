import { NgModule } from '@angular/core';
import { WallComponent } from './containers/wall/wall.component';
import { SharedModule } from '../shared/shared.module';
import { PostDetailsComponent } from './containers/post-details/post-details.component';

@NgModule({
    declarations: [WallComponent, PostDetailsComponent],
    exports: [WallComponent, PostDetailsComponent],
    imports: [SharedModule],
    entryComponents: [WallComponent, PostDetailsComponent],
})
export class WallModule {}
