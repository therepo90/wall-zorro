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
    private _availablePosts: Post[] = [];
    private _visiblePostsFiltered: Post[] = [];
    public columns: Array<Array<Post>> = [[]];
    public searchText: string;

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
                // @TODO remove
                this.columns = chunk(allPosts, 3);
                this.updateColumns(allPosts);
                return;

                const subscription = interval(1000)
                    .pipe(untilDestroyed(this))
                    .subscribe(() => {
                        const newPosts = [
                            ...this._availablePosts,
                            allPosts.shift(),
                        ];

                        this.updateColumns(newPosts);
                        if (allPosts.length === 0) {
                            subscription.unsubscribe();
                        }
                    });
            });
    }

    private updateColumns(newPosts: Array<Post>) {
        this._availablePosts = newPosts;
        const filteredArray = this.getFilteredPosts(newPosts, this.searchText);
        const sortedArray = orderBy(filteredArray, e => e.id, ['desc']);
        this._visiblePostsFiltered = filteredArray;
        this.columns = chunk(sortedArray, 3);
        this.cd.markForCheck();
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {}

    onSearch(value: string) {
        this.searchText = value;
        this.updateColumns(this._availablePosts);
    }

    private getFilteredPosts(posts: Array<Post>, value?: string): Array<Post> {
        if (!value) {
            return posts;
        }

        return posts.filter(
            post => post.title.includes(value) || post.body.includes(value)
        );
    }
}
