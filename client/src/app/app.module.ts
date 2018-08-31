import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { FilterPipe } from './filter.pipe';
import { AuthenticationService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GetAllComponent } from './dashboard/get-all/get-all.component';
import { CRUDService } from './dashboard/crud.service';
import { SocketioService } from './socketio.service';
import { PagerService } from './home/services/pager.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { UploadComponent } from './dashboard/upload/upload.component';
import { VoteComponent } from './dashboard/vote/vote.component';
import { VotingComponent } from './dashboard/voting/voting.component';
import { ResultComponent } from './dashboard/result/result.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'content/:id', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/upload', component: UploadComponent },
  { path: 'dashboard/vote', component: VoteComponent },
  { path: 'dashboard/vote/:id', component: VotingComponent },
  { path: 'dashboard/result/:id', component: ResultComponent }
  // ,
  // { path: 'logout', component: LoginComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    FilterPipe,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    GetAllComponent,
    UploadComponent,
    VoteComponent,
    VotingComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgxPaginationModule
  ],
  exports: [RouterModule],
  providers: [AuthenticationService, CRUDService, PagerService, SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _SocketioService: SocketioService, public _CRUDService: CRUDService) {
    // Consume events: Save and Update
    this._SocketioService.consumeEvenOnGistSaved(this._CRUDService);   // Save event
    this._SocketioService.consumeEvenOnGistUpdated(this._CRUDService); // Update event
  }
 }
