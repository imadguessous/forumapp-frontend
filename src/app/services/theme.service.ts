import { ForumService } from './forum.service';
import { environment } from './../../environments/environment';
import { Theme } from './../models/theme.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  mapThemes: Map<string,number>;
  themes: Array<Theme> = new Array<Theme>();
  url: string = environment.URL_API + "themes/";
  // url: string = "http://localhost:3000/themes/";

  constructor(private forumService: ForumService, private http: HttpClient) { }

  initThemes(): void{
  }

  getThemesFromBackend(): Observable<Array<Theme>>{
    return this.http.get<Array<Theme>>(this.url);
  }

  getThemeByIdFromBackend(id: String): Observable<Theme> {
    return this.http.get<Theme>(this.url + id);
  }

  getThemesByForumFromBackend(id: string): Observable<Array<Theme>>{
    return this.http.get<Array<Theme>>(this.url+"byForum/"+id);
  }

  editThemeInBackend(theme:Theme): Observable<Theme>{
    return this.http.put<Theme>(this.url + theme._id,theme);
  }

  createThemeInBackend(theme:Theme): Observable<Theme>{
    return this.http.post<Theme>(this.url,theme);
  }

  deleteThemeInBackend(theme:Theme) {
    return this.http.delete<Theme>(this.url + theme._id);
  }

  increaseTotalViews(theme: Theme){
    theme.totalViews +=1;
    this.editThemeInBackend(theme).subscribe();
  }

  initTotalThemes(){

    this.mapThemes = new Map();
    let index: number;
    let value: number;
    this.getThemesFromBackend().subscribe(
      (themes) => {
        // Generate a map of <key,value>=<forumId,totalThemes Of this forum>
        for (let theme of themes){
          index = Array.from(this.mapThemes.keys()).indexOf(theme.forumId)
          if ( index == -1 ){
            this.mapThemes.set(theme.forumId,1);
          } else{
            value = this.mapThemes.get(theme.forumId);
            this.mapThemes.set(theme.forumId,value+1);
          }
        }

        //Update totalThemes Of Each Forum
        for (let [key,value] of this.mapThemes){
          this.updateTotalThemes(key,value);
        }
      },
      (err) => console.log(err.message)

    );
  }

  updateTotalThemes(forumId: string, totalThemes: number){
    this.forumService.getForumByIdFromBackend(forumId).subscribe(
      (forum) =>{
        forum.totalThemes= totalThemes;
        this.forumService.editForumInBackend(forum).subscribe();
      }
    )
  }

}
