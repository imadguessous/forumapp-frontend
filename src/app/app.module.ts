import { MessageService } from 'primeng/api';

import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { UserService } from './services/user.service';
import { ForumByIdComponent } from './componants/forums/forum-by-id/forum-by-id.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './componants/themes/theme/theme.component';
import { HttpClientModule } from '@angular/common/http';
import { ThemeListByIdComponent } from './componants/themes/theme-list-by-id/theme-list-by-id.component';
import { ForumComponent } from './componants/forums/forum/forum.component';
import { PostByIdComponent } from './componants/posts/post-by-id/post-by-id.component';
import { PostComponent } from './componants/posts/post/post.component';

import {CalendarModule} from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { HomeComponent } from './componants/home/home.component';
import {PaginatorModule} from 'primeng/paginator';
import { LoginComponent } from './componants/login/login.component';
import {ToastModule} from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumCrudComponent } from './componants/forums/forum-crud/forum-crud.component';
import { ThemeCrudComponent } from './componants/themes/theme-crud/theme-crud.component';
import { PostCrudComponent } from './componants/posts/post-crud/post-crud.component';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { CommentsComponent } from './componants/comments/comments.component';
import { SignUpComponent } from './componants/sign-up/sign-up.component';
import { ForumAddComponent } from './componants/forums/forum-add/forum-add.component';
import { ForumUpdateComponent } from './componants/forums/forum-update/forum-update.component';
import { ThemeAddComponent } from './componants/themes/theme-add/theme-add.component';
import { ThemeUpdateComponent } from './componants/themes/theme-update/theme-update.component';
import { PostAddComponent } from './componants/posts/post-add/post-add.component';
import { PostUpdateComponent } from './componants/posts/post-update/post-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ThemeComponent,
    ThemeListByIdComponent,
    ForumComponent,
    ForumByIdComponent,
    PostComponent,
    PostByIdComponent,
    HomeComponent,
    LoginComponent,
    ForumCrudComponent,
    ThemeCrudComponent,
    PostCrudComponent,
    CommentsComponent,
    SignUpComponent,
    ForumAddComponent,
    ForumUpdateComponent,
    ThemeAddComponent,
    ThemeUpdateComponent,
    PostAddComponent,
    PostUpdateComponent,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CalendarModule,
    MultiSelectModule,
    PaginatorModule,
    ToastModule,
    BrowserAnimationsModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  providers: [ThemeService, UserService, PostService, CommentService, AuthService, AuthGuardService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
