import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputcomponentComponent } from './components/inputcomponent/inputcomponent.component'; // Import the component
import { Feature2Component } from './components/feature2/feature2.component';

const routes: Routes = [
  { path: 'feature1', component: InputcomponentComponent }, // Route for Weather
  { path: 'feature2', component: Feature2Component }, // Route for Air Pollution Data
  { path: '', redirectTo: '/feature1', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/feature1' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }