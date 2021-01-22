import { PostService } from './../../services/post.service';
import { ThemeService } from './../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ForumService } from './../../services/forum.service';
import { Forum } from './../../models/forum.model';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/models/theme.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private themeService: ThemeService, private postService: PostService, private authService: AuthService, private forumService: ForumService) { }
  forums: Array<Forum>;
  mostViewedForum: Forum;

  themes: Array<Theme>;
  mostViewedTheme: Theme;

  posts: Array<Post>;
  mostViewedPost: Post;


  ngOnInit(): void {
    this.setMostViewedForum();
    this.setMostViewedTheme();
    this.setMostViewedPost();


  }

  setMostViewedForum() {
    this.forumService.getForumsFromBackend().subscribe(
      (data) => {
        let mostViewed = 0;
        this.forums = data;
        for (let forum of this.forums) {
          if (forum.totalViews >= mostViewed) {
            this.mostViewedForum = forum;
            mostViewed = forum.totalViews;
          }
        }
      }
    )
  }
  onVisitForum() {
    if (this.authService.isAuth()) {
      this.router.navigate(['/forums/' + this.mostViewedForum._id]);
      this.forumService.increaseTotalViews(this.mostViewedForum);
    }
    else {
      this.router.navigate(['/login']);

    }
  }

  setMostViewedTheme() {
    this.themeService.getThemesFromBackend().subscribe(
      (data) => {
        let mostViewed = 0;
        this.themes = data;
        for (let theme of this.themes) {
          if (theme.totalViews >= mostViewed) {
            this.mostViewedTheme = theme;
            mostViewed = theme.totalViews;
          }
        }
      }
    )
  }
  onVisitTheme() {
    if (this.authService.isAuth()) {
      this.router.navigate(['/themes/' + this.mostViewedTheme._id]);
      this.themeService.increaseTotalViews(this.mostViewedTheme);
    }
    else{
      this.router.navigate(['/login']);

    }
  }

    setMostViewedPost(){
      this.postService.getPostsFromBackend().subscribe(
        (data) => {
          let mostViewed = 0;
          this.posts = data;
          for (let post of this.posts) {
            if (post.totalViews >= mostViewed) {
              this.mostViewedPost = post;
              mostViewed = post.totalViews;
            }
          }
        }
      )
    }
    onVisitPost(){
      if (this.authService.isAuth()) {
        this.router.navigate(['/posts/' + this.mostViewedPost._id]);
        this.postService.increaseTotalViews(this.mostViewedPost);
      }
      else {
        this.router.navigate(['/login']);

      }
    }

  }
