import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { PostService } from './_services/post.service';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PostFormComponent } from './post-form/post-form.component';

const appRoutes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:id', component: BlogDetailComponent},
  { path: 'blog-add', component: PostFormComponent},
  { path: 'blog/:id/edit', component: PostFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent,
    BlogDetailComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
