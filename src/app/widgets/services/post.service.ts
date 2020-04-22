import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private serverUrl = '';

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.serverUrl);
  }
  
  
  getById(_id: string): Observable<Post> {
    return this.httpClient.get<Post>(this.serverUrl + _id);
  }

  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.serverUrl, post);
  }

  update(_id: string, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.serverUrl + _id, post);
  }

  delete(_id: string): Observable<any> {
    return this.httpClient.delete<any>(this.serverUrl + _id);
  }
}
