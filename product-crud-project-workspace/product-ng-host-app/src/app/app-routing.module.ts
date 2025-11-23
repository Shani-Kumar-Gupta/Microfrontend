import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// All remote components are rendered directly inside AppComponent via
// Module Federation, so we don't need any Angular routes.
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
