import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservableInput, of } from "rxjs";
import { FbAuthResponse, User } from "src/app/shared/interfaces";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";


@Injectable()

export class AuthService {
    constructor(private http: HttpClient){}

    get token(): string | null {
        const expiresDateString = localStorage.getItem('fb-token-exp');
        
        if (!expiresDateString) return null;

        if (new Date() > new Date(expiresDateString)) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login( user: User): Observable<any> {
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken as Object),
                catchError(this.handleError.bind(this))
            )
    }

    private handleError(error: HttpHeaderResponse): ObservableInput<any> {
        //const {message} = error.
        
        return of([])
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private setToken(response: FbAuthResponse | null) {
        if (response) {
            const expiresDate = new Date( new Date().getTime() + (+response.expiresIn * 1000));
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expiresDate.toString());
        }
        else
            localStorage.clear();
        
        
    }
}