import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../models/post';
import { HttpService } from '../../shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class WallService {
    constructor(private http: HttpService) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(environment.api.posts);
    }

    getPost(postId: string): Observable<Post> {
        return this.http.get<Post>(environment.api.post(postId));
    }
}
