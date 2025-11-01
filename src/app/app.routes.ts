import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {DashboardComponent} from './home/dashboard/dashboard.component';
import {AuthGuard} from './guards/auth.guard';
import {ColisComponent} from './home/colis/colis.component';
import {ListColisComponent} from './home/colis/list-colis/list-colis.component';
import {AddEditColisComponent} from './home/colis/add-edit-colis/add-edit-colis.component';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path:'dashboard', component: DashboardComponent },
      { path:'colis', component: ColisComponent, children:[
        { path:'list-colis', component: ListColisComponent },
        { path:'create', component: AddEditColisComponent },
          { path: '', redirectTo: 'list-colis', pathMatch: 'full' },

        ] },

    ]
  }
];
