import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DataExplorationComponent } from './data-exploration/data-exploration.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminSectionComponent } from './admin-section/admin-section.component';

import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/explore', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component : UnauthorizedComponent},
  { path: 'admin', component : AdminSectionComponent, canActivate: [AdminGuard]},
  { path: 'explore', component: DataExplorationComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
