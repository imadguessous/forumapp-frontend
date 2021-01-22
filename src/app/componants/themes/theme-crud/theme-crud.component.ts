import { PostService } from './../../../services/post.service';
import { ForumService } from './../../../services/forum.service';
import { AuthService } from './../../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from './../../../services/user.service';
import { ThemeService } from './../../../services/theme.service';
import { User } from './../../../models/user.model';
import { Theme } from './../../../models/theme.model';
import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum.model';

@Component({
  selector: 'app-theme-crud',
  templateUrl: './theme-crud.component.html',
  styleUrls: ['./theme-crud.component.scss']
})
export class ThemeCrudComponent implements OnInit {
  themes: Array<Theme>;
  users: Array<User>;

  selectedThemes: Array<Theme>;
  themeDialog: boolean;
  theme: Theme;
  submitted: boolean;

  forumArray: Array<Forum>;
  forums: Array<Forum>;
  selectedForum: Forum;

  constructor(private postService: PostService, private forumService: ForumService, private authService: AuthService, private messageService: MessageService, private themeService: ThemeService, private userService: UserService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getThemes();
    this.initForums();
    this.postService.initTotalPosts();
  }

  onClick(): void {
    console.log(this.themes);

  }
  initForums() {
    this.forumService.getForumsFromBackend().subscribe(
      (data) => {
        this.forums = data;
      },
      (err) => {
        console.log(err.message);
      }
    );

  }

  getThemes() {
    this.themeService.getThemesFromBackend().subscribe(
      (data) => {
        this.themes = data;
        console.log(data);

      },
      (err) => console.log(err.message)
    );
  }

  openNew() {
    this.theme = new Theme();
    this.submitted = false;
    this.themeDialog = true;
  }

  deleteSelectedThemes() {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let theme of this.selectedThemes) {
          this.themeService.deleteThemeInBackend(theme).subscribe(
            (data) => {
              console.log(this.theme);
              this.themeDialog = false;
              this.getThemes();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Selected Themes Deleted Successfuly' });
            },
            (err) => {
              console.log(err.message)
              this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Selected Themes Failed To Delete' });
            }
          );
        }

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Delete Canceled', detail: 'Delete Selected Themes Canceled' });
      }
    });
  }

  editTheme(theme: Theme) {
    this.theme = { ...theme };
    this.submitted = true;
    this.themeDialog = true;
  }
  deleteTheme(theme: Theme) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.themeService.deleteThemeInBackend(theme).subscribe(
          (data) => {
            console.log(this.theme);
            this.themeDialog = false;
            this.getThemes();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Theme Deleted Successfuly' });
          },
          (err) => {
            console.log(err.message)
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Theme Failed To Delete' });
          }
        );

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Delete Canceled', detail: 'Delete Theme Canceled' });
      }
    });
  }

  saveTheme() {
    if (this.submitted) {
      this.themeService.editThemeInBackend(this.theme).subscribe(
        (data) => {
          console.log(this.theme);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Theme Added Successfuly' });
          this.themeDialog = false;
          this.getThemes();
        },
        (err) => {
          console.log(err.message)
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Theme Failed To Add' });
        }
      );
    }
    else {
      this.theme.userId = this.authService.user._id;
      if (this.theme.forumId === '' || this.theme.forumId === undefined) {
        this.theme.forumId = this.forums[0]._id;
      }
      console.log(this.theme);
      this.themeService.createThemeInBackend(this.theme).subscribe(
        (data) => {
          console.log(this.theme);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Theme Edited Successfuly' });
          this.themeDialog = false;
          this.getThemes();
          console.log('ok');

        },
        (err) => {
          console.log(err.message)
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Theme Failed To Edit' });
        }
      );
    }
  }
  onChange(forum: Forum) {
    this.theme.forumId = forum._id

  }
  hideDialog() {
    this.themeDialog = false;


  }
}
