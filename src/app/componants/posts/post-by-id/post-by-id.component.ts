import { ActivatedRoute } from '@angular/router';
import { PostService } from './../../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-by-id',
  templateUrl: './post-by-id.component.html',
  styleUrls: ['./post-by-id.component.scss']
})
export class PostByIdComponent implements OnInit {

  post: Post;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    const postId: string = this.activatedRoute.snapshot.params['postId'];
    this.postService.getPostByIdFromBackend(postId).subscribe(
      (data) => this.post = data,
      (err) => console.log(err.message)
    )
  }

}
