import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.currentUserValue) {
        return true;
    }

    // Redirect to the login page
    authService.logout();
    return true;
    // return false;
};
