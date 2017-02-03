/**
 * Created by Fabian on 24/01/2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { MenuComponent } from './menu/menu.component';
import { CargarMenuComponent } from './cargar-menu/cargar-menu.component';
import { ComprasComponent} from './compras/compras.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import {  RecargaComponent } from './recarga/recarga.component';
import {  MenuAdminComponent } from './menu-admin/menu-admin.component';

export const router: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent , canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'cargar', component: CargarMenuComponent },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
  { path:'compras', component: ComprasComponent},
  { path: 'proveedor', component: ProveedorComponent},
  {path: 'recarga', component: RecargaComponent},
  { path: 'menu-admin', component: MenuAdminComponent , canActivate: [AuthGuard]  }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
