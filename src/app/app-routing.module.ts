import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { LoginComponent, ResetPwdComponent } from './login/login.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch: 'full' },
  { path:'login', component:LoginComponent },
  { path:'reset', component:ResetPwdComponent },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard/analytics', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'views',
        loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
      }
      
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
