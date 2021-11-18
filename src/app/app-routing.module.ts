import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrafoComponent } from './pages/grafo/grafo.component';
import { PersonEditComponent } from './pages/person-edit/person-edit.component';
import { PersonComponent } from './pages/person/person.component';

const routes: Routes = [
  {path: '', component: PersonComponent},
  {path: 'detail/:id', component: PersonEditComponent},
  {path: 'detail', component: PersonEditComponent},
  {path: 'grafo', component: GrafoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
