import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WallService } from '../../services/wall.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent implements OnInit {
    private post$: Observable<Post>;

    constructor(
        private location: Location,
        private wallService: WallService,
        private activatedRoute: ActivatedRoute
    ) {
        this.post$ = this.wallService.getPost(
            activatedRoute.snapshot.paramMap.get('postId')
        );
    }

    ngOnInit() {}

    goBack() {
        this.location.back();
    }

  getRandomName(userId: number) {
    return Math.random() * 999 + userId * 77;
  }
}
