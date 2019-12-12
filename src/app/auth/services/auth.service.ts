import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

    constructor(private storageService: StorageService) {}

    async login(userName: string, password: string): Promise<void> {
        const mockBackendResponse = await Promise.resolve({
            token: 'secret-token',
        });
        this.storageService.save(
            this.AUTH_TOKEN_KEY,
            mockBackendResponse.token
        );
    }
}
