import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flix-api-2022.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  //inject the httpclient module to the constructor params
  //this will provide http client to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
  //1. making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  //2. making the api call for the user login endpoint
  public userLogin(username: string, password: string): Observable<any> {
    return this.http
      .post(apiUrl + 'login', {
        username: username,
        password: password,
      })
      .pipe(catchError(this.handleError));
  }

  //3.making the api call to get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  // Non-typed response extraction
  //res: Response throws error
  private extractResponseData(res: any): any {
    if (res) {
      const body = res;
      return body || {};
    }
  }

  //4.making the api call to get one movie
  getMovie(title: string): Observable<any> {
    console.log(title);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //5.making the api call to get the director
  getDirector(director: string): Observable<any> {
    console.log(director);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `directors/${director}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //6.making the api call to get the genre
  getGenre(genre: string): Observable<any> {
    console.log(genre);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `genres/${genre}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //7.making the api call to get one user
  getUser(user: string): Observable<any> {
    console.log(user);
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //8. making the api call to get favorite movies
  getFavorites(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}/favoriteMovies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //9. making the api call to edit the user
  editUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //10.making the api call to delete the user
  deleteUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //11. making the api call to delete a movie from the user's favorites
  deleteFavorite(user: string, id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${user}/favoriteMovies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}
