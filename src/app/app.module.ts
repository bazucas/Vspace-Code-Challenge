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
import {AutoCompleteModule, ButtonModule, InputTextModule, PanelModule, RadioButtonModule, ScrollPanelModule} from 'primeng/primeng';
import {VerticalTimelineModule} from 'angular-vertical-timeline';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CollapseModule,
    AutoCompleteModule,
    VerticalTimelineModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ScrollPanelModule,
    FormsModule,
    PanelModule,
    TableModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
