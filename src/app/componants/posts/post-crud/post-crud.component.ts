import { CommentService } from './../../../services/comment.service';
import { ThemeService } from './../../../services/theme.service';
import { Theme } from './../../../models/theme.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from './../../../services/user.service';
import { PostService } from './../../../services/post.service';
import { User } from './../../../models/user.model';
import { Post } from './../../../models/post.model';
@Component({
  selector: 'app-post-crud',
  templateUrl: './post-crud.component.html',
  styleUrls: ['./post-crud.component.scss']
})
export class PostCrudComponent implements OnInit {

  posts: Array<Post>;
  users: Array<User>;

  selectedPosts: Array<Post>;
  postDialog: boolean;
  post: Post;
  submitted: boolean;

  themeArray: Array<Theme>;
  themes: Array<Theme>;
  selectedTheme: Theme;

  constructor(private commentService: CommentService, private themeService: ThemeService, private authService: AuthService, private messageService: MessageService, private postService: PostService, private userService: UserService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getPosts();
    this.initThemes();
    this.commentService.initTotalComments();
  }

  onClick(): void {
    console.log(this.posts);

  }
  initThemes() {
    this.themeService.getThemesFromBackend().subscribe(
      (data) => {
        this.themes = data;
      },
      (err) => {
        console.log(err.message);
      }
    );

  }

  getPosts() {
    this.postService.getPostsFromBackend().subscribe(
      (data) => {
        this.posts = data;
        console.log(data);

      },
      (err) => console.log(err.message)
    );
  }

  openNew() {
    this.post = new Post();
    this.submitted = false;
    this.postDialog = true;
  }

  deleteSelectedPosts() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        for (let post of this.selectedPosts) {
          this.postService.deletePostInBackend(post).subscribe(
            (data) => {
              console.log(this.post);
              this.postDialog = false;
              this.getPosts();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post Deleted Successfuly' });
            },
            (err) => {
              console.log(err.message)
              this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Post Failed To Edit' });
            }
          );
        }

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Delete Canceled', detail: 'Delete Selected Themes Canceled' });
      }
    });
  }

  editPost(post: Post) {
    this.post = { ...post };
    this.submitted = true;
    this.postDialog = true;
  }
  deletePost(post: Post) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.postService.deletePostInBackend(post).subscribe(
          (data) => {
            console.log(this.post);
            this.postDialog = false;
            this.getPosts();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post Deleted Successfuly' });
          },
          (err) => {
            console.log(err.message)
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Post Failed To Edit' });
          }
        );

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Delete Canceled', detail: 'Delete Selected Themes Canceled' });
      }
    });
  }

  savePost() {
    if (this.submitted) {
      this.postService.editPostInBackend(this.post).subscribe(
        (data) => {
          console.log(this.post);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post Edited Successfuly' });
          this.postDialog = false;
          this.getPosts();
        },
        (err) => {
          console.log(err.message)
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Post Failed To Edit' });
        }
      );
    }
    else {
      this.post.userId = this.authService.user._id;
      if (this.post.themeId === undefined) {
        this.post.themeId = this.themes[0]._id;
      }
      this.post.userId = this.authService.user._id;
      console.log(this.post);
      this.postService.createPostInBackend(this.post).subscribe(
        (data) => {
          console.log(this.post);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post Created Successfuly' });
          this.postDialog = false;
          this.getPosts();
        },
        (err) => {
          console.log(err.message)
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Post Failed To Create' });
        }
      );
    }
  }
  onChange(theme: Theme) {
    this.post.themeId = theme._id

  }
  hideDialog() {
    this.postDialog = false;


  }

}
