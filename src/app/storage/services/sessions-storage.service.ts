import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable()
export class SessionsStorageService extends StorageService {
    get(key: string): Record<string, any> | string | null {
        const val = window.sessionStorage.getItem(key);
        try {
            return JSON.parse(val);
        } catch (e) {
            return val; // string
        }
    }

    save(key: string, val: any) {
        window.sessionStorage.setItem(key, JSON.stringify(val, null, 2));
    }

    delete(key: string) {
        window.sessionStorage.removeItem(key);
    }
}
