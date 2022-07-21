import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * declaring the api url that will provide data for the client app
 */
const apiUrl = 'https://my-flix-api-2022.herokuapp.com/';
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  //inject the httpclient module to the constructor params
  //this will provide http client to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  //post requests
  /**
   * making the api call for the user registration endpoint
   * @param userDetails
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * making the api call for the user login endpoint
   * @param loginData
   * @returns the user object in JSON format
   */
  /** 2. making the api call for the user login endpoint */
  public userLogin(loginData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', loginData)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get list of favorite movies of this user
   * @param movie
   * @returns list of the user's favorite movies in JSON format
   */
  public addFavorite(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/favoriteMovies/${movie}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //get requests
  /**
   * calls API endpoint to get data on all movies
   * @returns array of all movies in JSON format
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get data on a single movie specified by its title
   * @param title
   * @returns JSON object holding movie data
   */
  public getMovie(title: string): Observable<any> {
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

  /**
   * calls API endpoint to get data on a director
   * @param director
   * @returns JSON obejct holding director data
   */
  public getDirector(director: string): Observable<any> {
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

  /**
   * calls API endpoint to get data on a genre
   * @param genre
   * @returns JSON object holding genre data
   */
  public getGenre(genre: string): Observable<any> {
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

  /**
   * calls API endpoint to get data on a single user
   * @returns JSON object holding data about the requested user
   */
  public getUser(): Observable<any> {
    // Get Authorization token stored in local storage
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to get list of favorite movies of this user
   * @returns list of the user's favorite movies in JSON format
   */
  public getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${user}/favoriteMovies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //put requests
  /**
   * calls API endpoint to allow user to update their user information
   * @param userData
   * @returns JSON object holding data about the updated user
   */
  public editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //delete requests
  /**
   * calls API endpoint to deregister a user
   * @param user
   * @returns	A success message indicating that the profile was successfully deleted.
   */
  public deleteUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * calls API endpoint to delete a movie from the user's list of favorite movies
   * @param id
   * @returns JSON object holding data about the updated user
   */
  public deleteFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}/favoriteMovies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //private helper functions
  /**
   * extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */
  private extractResponseData(res: object): object {
    const body = res;
    return body || {};
  }

  /**
   * handles errors
   * @param error
   * @returns error message
   */
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
