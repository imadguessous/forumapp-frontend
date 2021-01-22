import { ThemeService } from './theme.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './../models/post.model';
import { Injectable } from '@angular/core';
const url = environment.URL_API + "posts/";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  mapPosts: Map<string,number>;
  posts: Array<Post> = new Array<Post>();

  // url: string = "http://localhost:3000/posts/";
  constructor(private themeService: ThemeService,private http: HttpClient) { }
  initPosts(): void{
  }

  getPostsFromBackend(): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(url);
  }

  getPostByIdFromBackend(id: String): Observable<Post> {
    return this.http.get<Post>(url + id);
  }

  getPostsByThemeFromBackend(id: string): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(url+"byTheme/"+id);
  }

  editPostInBackend(post:Post): Observable<Post>{
    return this.http.put<Post>(url + post._id,post);
  }

  createPostInBackend(post:Post): Observable<Post>{
    return this.http.post<Post>(url,post);
  }

  deletePostInBackend(post:Post) {
    return this.http.delete<Post>(url + post._id);
  }

  increaseTotalViews(post: Post){
    post.totalViews +=1;
    this.editPostInBackend(post).subscribe();
  }

  initTotalPosts(){

    this.mapPosts = new Map();
    let index: number;
    let value: number;
    this.getPostsFromBackend().subscribe(
      (posts) => {
        // Generate a map of <key,value>=<themeId,totalPosts Of this theme>
        for (let post of posts){
          index = Array.from(this.mapPosts.keys()).indexOf(post.themeId)
          if ( index == -1 ){
            this.mapPosts.set(post.themeId,1);
          } else{
            value = this.mapPosts.get(post.themeId);
            this.mapPosts.set(post.themeId,value+1);
          }
        }

        //Update totalPosts Of Each Forum
        for (let [key,value] of this.mapPosts){
          this.updateTotalPosts(key,value);
        }
      },
      (err) => console.log(err.message)

    );
  }

  updateTotalPosts(themeId: string, totalPosts: number){
    this.themeService.getThemeByIdFromBackend(themeId).subscribe(
      (theme) =>{
        theme.totalPosts= totalPosts;
        this.themeService.editThemeInBackend(theme).subscribe();
      }
    )
  }
}
