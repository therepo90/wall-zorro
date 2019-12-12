import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { WallService } from '../../services/wall.service';
import { Post } from '../../models/post';
import { BehaviorSubject, interval } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WallComponent implements OnInit, OnDestroy {
    private _visiblePosts$ = new BehaviorSubject<Post[]>([]);
    public visiblePosts$ = this._visiblePosts$.asObservable();

    constructor(private wallService: WallService) {}

    ngOnInit() {
        this.wallService
            .getPosts()
            .pipe(
                untilDestroyed(this),
                filter(posts => posts.length > 0)
            )
            .subscribe((posts: Array<Post>) => {
                const allPosts = posts;
                const subscription = interval(1000)
                    .pipe(untilDestroyed(this))
                    .subscribe(() => {
                        this._visiblePosts$.next([
                            ...this._visiblePosts$.getValue(),
                            allPosts.shift(),
                        ]);
                        if (allPosts.length === 0) {
                            subscription.unsubscribe();
                        }
                    });
            });
    }

    ngOnDestroy(): void {}
}
