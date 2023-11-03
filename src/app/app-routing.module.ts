import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphViewerComponent } from './graph-viewer/graph-viewer.component';

const routes: Routes = [
  {
    component: GraphViewerComponent,
    path: 'graph'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
