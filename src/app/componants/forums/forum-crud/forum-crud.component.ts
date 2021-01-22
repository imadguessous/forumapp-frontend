import { ThemeService } from './../../../services/theme.service';
import { AuthService } from './../../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from './../../../services/user.service';
import { ForumService } from './../../../services/forum.service';
import { Forum } from './../../../models/forum.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-forum-crud',
  templateUrl: './forum-crud.component.html',
  styleUrls: ['./forum-crud.component.scss']
})
export class ForumCrudComponent implements OnInit {
  forums: Array<Forum>;
  users: Array<User>;

  selectedForums: Array<Forum>;
  forumDialog: boolean;
  forum: Forum;
  submitted: boolean;

  constructor(private themeService: ThemeService, private authService: AuthService, private messageService: MessageService, private forumService: ForumService, private userService: UserService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getForums();
    this.themeService.initTotalThemes();
  }

  onClick(): void {
    console.log(this.forums);

  }

  getForums() {
    this.forumService.getForumsFromBackend().subscribe(
      (data) => {
        this.forums = data;
        // this.users = new Array<User>();
        // for (let f of this.forums){
        //   this.users.push(this.getUser(f.userId));
        // }
        console.log(data);

      },
      (err) => console.log(err.message)
    );
  }

  openNew() {
    this.forum = new Forum();
    this.submitted = false;
    this.forumDialog = true;
  }

  deleteSelectedForums() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

      for (let forum of this.selectedForums) {
        this.forumService.deleteForumInBackend(forum).subscribe(
          (data) => {
            console.log(this.forum);
            this.forumDialog = false;
            this.getForums();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Selected Forums Deleted Successfuly' });
          },
          (err) => {
            console.log(err.message)
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Seleted Forums Failed To Delete' });
          }
        );
      }

      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Delete Canceled', detail: 'Delete Selected Usagers Canceled'});
      }
    });
  }

  editForum(forum: Forum) {
    this.forum = { ...forum };
    this.submitted = true;
    this.forumDialog = true;
  }
  deleteForum(forum: Forum) {
    console.log(forum);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.forumService.deleteForumInBackend(forum).subscribe(
          (data) => {
            console.log(this.forum);
            this.forumDialog = false;
            this.getForums();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Forum Deleted Successfuly' });
          },
          (err) => {
            console.log(err.message)
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Forum Failed To Delete' });
          }
        );

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Delete Canceled', detail: 'Delete Forum Canceled' });
      }
    });
  }

  saveForum() {
    if (this.submitted) {
      this.forumService.editForumInBackend(this.forum).subscribe(
        (data) => {
          console.log(this.forum);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Forum Added Successfuly' });
          this.forumDialog = false;
          this.getForums();
        },
        (err) => {
          console.log(err.message)
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Forum Failed To Add' });
        }
      );
    }
    else {
      this.forum.userId = this.authService.user._id;
      console.log(this.forum);
      this.forumService.createForumInBackend(this.forum).subscribe(
        (data) => {
          console.log(this.forum);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Forum Edited Successfuly' });
          this.forumDialog = false;
          this.getForums();
        },
        (err) => {
          console.log(err.message)
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Forum Failed To Edit' });
        }
      );
    }
  }

  hideDialog() {
    this.forumDialog = false;


  }


}
