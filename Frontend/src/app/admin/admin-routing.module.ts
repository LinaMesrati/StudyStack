import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { GestFormateurComponent } from './gest-formateur/gest-formateur.component';
import { ChartComponent } from './statistiques/chart/chart.component';

const routes: Routes = [
  {path:"",component:RegistrationComponent},
  {path:"all",component:GestFormateurComponent},
  {path:"chart",component:ChartComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
