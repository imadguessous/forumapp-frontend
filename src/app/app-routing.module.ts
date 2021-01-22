import { SignUpComponent } from './componants/sign-up/sign-up.component';
import { PostByIdComponent } from './componants/posts/post-by-id/post-by-id.component';
import { CommentsComponent } from './componants/comments/comments.component';
import { PostCrudComponent } from './componants/posts/post-crud/post-crud.component';
import { ForumCrudComponent } from './componants/forums/forum-crud/forum-crud.component';
import { ThemeCrudComponent } from './componants/themes/theme-crud/theme-crud.component';
import { LoginComponent } from './componants/login/login.component';
import { HomeComponent } from './componants/home/home.component';
import { PostComponent } from './componants/posts/post/post.component';
import { ForumByIdComponent } from './componants/forums/forum-by-id/forum-by-id.component';
import { ForumComponent } from './componants/forums/forum/forum.component';
import { ThemeListByIdComponent } from './componants/themes/theme-list-by-id/theme-list-by-id.component';
import { ThemeComponent } from './componants/themes/theme/theme.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'themes', component: ThemeComponent, canActivate: [AuthGuardService]},
  {path:'forums', component: ForumComponent, canActivate: [AuthGuardService]},
  {path:'posts', component: PostComponent, canActivate: [AuthGuardService]},
  {path:'comments', component: CommentsComponent, canActivate: [AuthGuardService]},

  {path:'forums/crud', component: ForumCrudComponent, canActivate: [AuthGuardService]},
  {path:'themes/crud', component: ThemeCrudComponent, canActivate: [AuthGuardService]},
  {path:'posts/crud', component: PostCrudComponent, canActivate: [AuthGuardService]},

  {path:'login', component: LoginComponent},
  {path:'sign-up', component: SignUpComponent},

  {path:'forums/:forumId', component: ForumByIdComponent, canActivate: [AuthGuardService]},
  {path:'themes/:themeId', component: ThemeListByIdComponent, canActivate: [AuthGuardService]},
  {path:'posts/:postId', component: PostByIdComponent, canActivate: [AuthGuardService]},

  {path:'', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
