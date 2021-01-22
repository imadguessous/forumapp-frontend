import { PostService } from './../../../services/post.service';
import { Router } from '@angular/router';
import { Forum } from './../../../models/forum.model';
import { ForumService } from './../../../services/forum.service';
import { ThemeService } from '../../../services/theme.service';
import { Theme } from '../../../models/theme.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  @Input() forumId: string;
  themes: Array<Theme>;
  forum: Forum;

  constructor(private postService: PostService, private router: Router,private themeService: ThemeService, private forumService: ForumService) { }

  ngOnInit(): void {

    this.postService.initTotalPosts();
    if (this.forumId === undefined) {
      this.getThemes();
    }
    else {
      this.getThemesByForum();
      console.log(this.forumId);
      this.forumService.getForumByIdFromBackend(this.forumId).subscribe(
        (data) => {
          this.forum = data;
        },
        (err) => {
          console.log(err.message)
        }
      );
    }

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

  getThemesByForum() {
    this.themeService.getThemesByForumFromBackend(this.forumId).subscribe(
      (data) => {
        this.themes = data;
        console.log(data);


      },
      (err) => console.log(err.message)
    );
  }

  onRowClick(theme: Theme){
    this.router.navigate(['/themes/'+theme._id]);
    this.themeService.increaseTotalViews(theme);

  }




}
