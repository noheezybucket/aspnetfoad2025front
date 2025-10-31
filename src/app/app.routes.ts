import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path:'login', component: LoginComponent },
      { path:'register', component: RegisterComponent },
    ]
  },
  {
    path: '',
    component: HomeComponent,
  }
];
