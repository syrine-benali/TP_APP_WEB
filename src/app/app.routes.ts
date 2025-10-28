import { Routes } from '@angular/router';
import { Login } from './shared/login/login/login';
import { Home } from './shared/home/home/home';
import { authGuard } from './shared/auth/auth-guard';
import { Admin } from './shared/admin/admin';
import { adminGuard } from './shared/admin/admin-guard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'admin', component: Admin, canActivate: [adminGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', redirectTo: 'home' },
];
