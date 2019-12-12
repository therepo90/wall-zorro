import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../models/post';

@Injectable({
    providedIn: 'root',
})
export class WallService {
    constructor(private httpClient: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(environment.api.posts);
    }
}
