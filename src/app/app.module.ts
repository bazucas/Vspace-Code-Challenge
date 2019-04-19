import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsernameValidatorDirective } from './directives/username-validator.directive';
import {appRoutes} from './app-routes';
import {RouterModule} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PostsComponent } from './components/posts/posts.component';
import { AdminComponent } from './components/admin/admin.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import {CollapseModule} from 'ngx-bootstrap';
import {AutoCompleteModule} from 'primeng/primeng';
import {VerticalTimelineModule} from 'angular-vertical-timeline';

@NgModule({
  declarations: [
    AppComponent,
    UsernameValidatorDirective,
    PageNotFoundComponent,
    PostsComponent,
    AdminComponent,
    NavComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule,
    AutoCompleteModule,
    VerticalTimelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
