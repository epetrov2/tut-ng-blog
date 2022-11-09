import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
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

    getAll(): Observable<Post[]> {
        
        return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)
            .pipe(
                //tap(response => console.log(response)),
                map((response: {[key: string]: any}) => {
                    var newPosts: Post[] = Object
                    .keys(response)
                    .map( key => ({
                        ...response[key],
                        id: key,
                        date: new Date(response[key].date)
                    }))
                    return newPosts;
                })
            )
    }

}

