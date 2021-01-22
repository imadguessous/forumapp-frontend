import { ForumService } from './../../../services/forum.service';
import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-by-id',
  templateUrl: './forum-by-id.component.html',
  styleUrls: ['./forum-by-id.component.scss']
})
export class ForumByIdComponent implements OnInit {
  forum: Forum;
  constructor(private forumService: ForumService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const forumId = this.activatedRoute.snapshot.params['forumId'];
    this.getForumById(forumId);
    // console.log(forumId);
  }

  getForumById(id: String): void{
    this.forumService.getForumByIdFromBackend(id).subscribe(
      (data) => this.forum = data,
      (err) => console.log(err.message)
    )
  }

}
