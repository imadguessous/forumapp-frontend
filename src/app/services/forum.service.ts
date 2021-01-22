import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Forum } from '../models/forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  forums: Array<Forum> = new Array<Forum>();
  forumSubject: Subject<Array<Forum>> = new Subject<Array<Forum>>();

  url: string = environment.URL_API+"forums/"
  // url: sctring = "http://localhost:3000/forums/";

  constructor(private http: HttpClient) { }

  initForums(): void {


  }

  getForumsFromBackend(): Observable<Array<Forum>> {
    return this.http.get<Array<Forum>>(this.url);

  }
  getForumByIdFromBackend(id: String): Observable<Forum> {
    return this.http.get<Forum>(this.url + id);
  }

  editForumInBackend(forum:Forum): Observable<Forum>{
    return this.http.put<Forum>(this.url + forum._id,forum);
  }

  createForumInBackend(forum:Forum): Observable<Forum>{
    return this.http.post<Forum>(this.url,forum);
  }

  deleteForumInBackend(forum:Forum) {
    return this.http.delete<Forum>(this.url + forum._id);
  }

  increaseTotalViews(forum: Forum){
    forum.totalViews +=1;
    this.editForumInBackend(forum).subscribe();
  }




}
