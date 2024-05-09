import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DocumentComponent } from './document/document.component';
import { MeetComponent } from './meet/meet.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    children: [
      {
        path: 'document', component: DocumentComponent
      },
      {
        path: 'meet', component:MeetComponent
      },
      {
        path: 'chat', component:ChatComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
