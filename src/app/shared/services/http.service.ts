import { Injectable } from '@angular/core';
import { Post } from '../../wall/models/post';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(
        private httpClient: HttpClient,
        private modalService: NzModalService
    ) {}

    get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(url).pipe(
            catchError((err: any) => {
                this.showErrorModal(err);
                throw err;
            })
        );
    }

    private showErrorModal(err: any) {
        this.modalService.create({
            nzTitle: 'Error',
            nzContent: 'Network error: ' + err.message || '' ,
            nzClosable: true,
        });
    }
}
