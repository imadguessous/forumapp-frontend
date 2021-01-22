import { ThemeService } from './../../../services/theme.service';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { ForumService } from './../../../services/forum.service';
import { Forum } from './../../../models/forum.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  forums: Array<Forum>;
  users: Array<User>;

  constructor(private themeService: ThemeService,private forumService: ForumService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getForums();
    // this.initTotalThemes();
    this.themeService.initTotalThemes();
  }

  initTotalThemes(){
    this.forumService.getForumsFromBackend().subscribe(
      (forums) => {
        let forum: Forum;
        for (let i=0; i<forums.length; i++){
          forum = forums[i];
          forum.totalThemes = 0;
          if (i != forums.length-1){
            this.forumService.editForumInBackend(forum).subscribe();
          }else{
            this.forumService.editForumInBackend(forum).subscribe(
              (data) => {
                this.themeService.initTotalThemes();
                console.log('ALRIIIGHT');

              }
            );
          }

        }
      },
    );

   this.themeService.initTotalThemes();
  }


  onClick(): void{
    console.log(this.forums);

  }

  getForums(){
    this.forumService.getForumsFromBackend().subscribe(
      (data) =>{
        this.forums = data;
        // this.users = new Array<User>();
        // for (let f of this.forums){
        //   this.users.push(this.getUser(f.userId));
        // }
        console.log(data);

      } ,
      (err) => console.log(err.message)
    );
  }

  onRowClick(forum: Forum){
    this.router.navigate(['/forums/'+forum._id]);
    this.forumService.increaseTotalViews(forum);
  }

}
