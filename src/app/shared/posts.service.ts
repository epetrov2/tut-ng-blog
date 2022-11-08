import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { FbCreateResponse, Post } from "./interfaces";

@Injectable({providedIn: "root"})

export class PostService {

    constructor(private http: HttpClient) {}

    create(post: Post): Observable<Post> {
        return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
        .pipe(
            map((response: FbCreateResponse) => {
                
                return {
                    ...post, 
                    id: response.name,
                    date: new Date(post.date),
                } 
            })
        );
    }

}

