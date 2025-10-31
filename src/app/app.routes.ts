import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path:'login', component: LoginComponent },
      { path:'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },

    ]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path:'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    ]
  }
];
