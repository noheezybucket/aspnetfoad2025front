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
import {ClientsComponent} from './home/clients/clients.component';
import {ListClientsComponent} from './home/clients/list-clients/list-clients.component';
import {AddClientsComponent} from './home/clients/add-clients/add-clients.component';
import {ListLivreursComponent} from './home/livreurs/list-livreurs/list-livreurs.component';
import {LivreursComponent} from './home/livreurs/livreurs.component';
import {AddLivreursComponent} from './home/livreurs/add-livreurs/add-livreurs.component';
import {LivraisonsComponent} from './home/livraisons/livraisons.component';
import {ListLivraisonsComponent} from './home/livraisons/list-livraisons/list-livraisons.component';
import {DetailsLivraisonComponent} from './home/livraisons/details-livraison/details-livraison.component';

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

      { path:'colis',
        component: ColisComponent,
        children:[
          { path:'list-colis', component: ListColisComponent },
          { path:'create', component: AddEditColisComponent },
          { path: '', redirectTo: 'list-colis', pathMatch: 'full' },
        ]
      },

      { path: 'clients',
        component:ClientsComponent,
        children:[
          { path:'list-clients', component: ListClientsComponent },
          { path:'add-clients', component: AddClientsComponent },
          { path:'', redirectTo: 'list-clients', pathMatch: 'full' },
        ]
      },

      { path: 'livreurs',
        component:LivreursComponent,
        children:[
          { path:'list-livreurs', component: ListLivreursComponent },
          { path:'add-livreurs', component: AddLivreursComponent },
          { path:'', redirectTo: 'list-livreurs', pathMatch: 'full' },
        ]
      },

      { path: 'livraisons',
        component:LivraisonsComponent,
        children:[
          {path: "list-livraisons", component: ListLivraisonsComponent },
          {path: "details-livraison/:id", component: DetailsLivraisonComponent },
          { path:'', redirectTo: 'list-livraisons', pathMatch: 'full' },

        ]
      }

    ]
  }
];
