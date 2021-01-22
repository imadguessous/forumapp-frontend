import { PostService } from './post.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  mapComments: Map<string,number>;
  comments: Array<Comment> = new Array<Comment>();

  // url: string = "http://localhost:3000/comments/";
  url: string = environment.URL_API + "comments/";
  constructor(private postService:PostService,private http: HttpClient) { }
  initComments(): void{
  }

  getCommentsFromBackend(): Observable<Array<Comment>>{
    return this.http.get<Array<Comment>>(this.url);
  }

  getCommentByIdFromBackend(id: String): Observable<Comment> {
    return this.http.get<Comment>(this.url + id);
  }

  getCommentsByPostFromBackend(id: string): Observable<Array<Comment>>{
    return this.http.get<Array<Comment>>(this.url+"byPost/"+id);
  }

  createComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.url, comment);
  }

  updateComment(comment:Comment): Observable<Comment>{
    return this.http.put<Comment>(this.url+ comment._id, comment);
  }


  initTotalComments(){

    this.mapComments = new Map();
    let index: number;
    let value: number;
    this.getCommentsFromBackend().subscribe(
      (themes) => {
        // Generate a map of <key,value>=<postId,totalComments Of this post>
        for (let theme of themes){
          index = Array.from(this.mapComments.keys()).indexOf(theme.postId)
          if ( index == -1 ){
            this.mapComments.set(theme.postId,1);
          } else{
            value = this.mapComments.get(theme.postId);
            this.mapComments.set(theme.postId,value+1);
          }
        }

        //Update totalComments Of Each Post
        for (let [key,value] of this.mapComments){
          this.updateTotalComments(key,value);
        }
      },
      (err) => console.log(err.message)

    );
  }

  updateTotalComments(postId: string, totalComments: number){
    this.postService.getPostByIdFromBackend(postId).subscribe(
      (post) =>{
        post.totalComments= totalComments;
        this.postService.editPostInBackend(post).subscribe();
      }
    )
  }
}
