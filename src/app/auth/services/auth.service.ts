import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

    constructor(
        private storageService: StorageService,
        private router: Router
    ) {}

    async login(userName: string, password: string): Promise<void> {
        const mockBackendResponse = await Promise.resolve({
            token: 'secret-token',
        });
        this.storageService.save(
            this.AUTH_TOKEN_KEY,
            mockBackendResponse.token
        );
        this.router.navigateByUrl('/wall');
    }

    logout() {
        this.storageService.delete(this.AUTH_TOKEN_KEY);
        this.router.navigateByUrl('/login');
    }

    isAuthenticated() {
        return this.storageService.get(this.AUTH_TOKEN_KEY) !== null;
    }
}
