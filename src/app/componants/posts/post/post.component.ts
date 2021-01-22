import { CommentService } from './../../../services/comment.service';
import { Router } from '@angular/router';
import { Theme } from './../../../models/theme.model';
import { ThemeService } from './../../../services/theme.service';
import { PostService } from './../../../services/post.service';
import { Post } from './../../../models/post.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() themeId: string;
  posts: Array<Post>;
  theme: Theme;

  constructor(private commentService: CommentService,private postService: PostService, private themeService: ThemeService, private router: Router) { }

  ngOnInit(): void {
    this.commentService.initTotalComments();
    if (this.themeId === undefined){
      this.getPosts();
    }
    else{
      this.getPostsByTheme();
      console.log(this.themeId);

      this.themeService.getThemeByIdFromBackend(this.themeId).subscribe(
        (data) => {
          this.theme = data;
        },
        (err) => {
          console.log(err.message)
        }
      );
    }

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

  getPostsByTheme(){
    this.postService.getPostsByThemeFromBackend(this.themeId).subscribe(
      (data) => {
        this.posts = data;
        console.log(data);


      },
      (err) => console.log(err.message)
    );
  }

  onRowClick(post: Post){
    this.router.navigate(['/posts/'+post._id]);
    this.postService.increaseTotalViews(post);
  }
}
