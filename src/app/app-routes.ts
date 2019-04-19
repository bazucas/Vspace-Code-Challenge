import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PostsComponent} from './components/posts/posts.component';
import {AdminComponent} from './components/admin/admin.component';

export const appRoutes: Routes = [
  {path: '', component: PostsComponent},
  {path: 'admin', component: AdminComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];
