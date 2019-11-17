import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { CQPattern1Component } from './cqpattern1/cqpattern1.component';
import { CQPattern2Component } from './cqpattern2/cqpattern2.component';
import { CQPattern3Component } from './cqpattern3/cqpattern3.component';
import { CQPattern4Component } from './cqpattern4/cqpattern4.component';
import { RepositoryComponent } from './repository/repository.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pattern1', component: CQPattern1Component },
  { path: 'pattern2', component: CQPattern2Component },
  { path: 'pattern3', component: CQPattern3Component },
  { path: 'pattern4', component: CQPattern4Component },
  { path: 'repository', component: RepositoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
