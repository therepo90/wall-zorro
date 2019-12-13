import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { WallService } from '../../services/wall.service';
import { Post } from '../../models/post';
import { interval } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';
import { chunk, orderBy } from 'lodash-es';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WallComponent implements OnInit, OnDestroy {
    private _visiblePosts: Post[] = [];
    public columns: Array<Array<Post>> = [[]];

    constructor(
        private wallService: WallService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.wallService
            .getPosts()
            .pipe(
                untilDestroyed(this),
                filter(posts => posts.length > 0)
            )
            .subscribe((posts: Array<Post>) => {
                const allPosts = posts;
                this.columns = chunk(allPosts, 3);
                this.cd.markForCheck();
                return;

                const subscription = interval(1000)
                    .pipe(untilDestroyed(this))
                    .subscribe(() => {
                        const newArray = [
                            ...this._visiblePosts,
                            allPosts.shift(),
                        ];
                        const sortedArray = orderBy(newArray, e => e.id, [
                            'desc',
                        ]);
                        this._visiblePosts = sortedArray;
                        this.columns = chunk(sortedArray, 3);
                        console.log({ sortedArray }, { x: this.columns });
                        if (allPosts.length === 0) {
                            subscription.unsubscribe();
                        }
                        this.cd.markForCheck();
                    });
            });
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {}
}
