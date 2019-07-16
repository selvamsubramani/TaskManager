import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './ui/add/add.component';
import { ViewComponent } from './ui/view/view.component';
import { EditComponent } from './ui/edit/edit.component';

const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [AddComponent, EditComponent, ViewComponent]
