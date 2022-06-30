import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
//import components needed (director, actor, synopsis)
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SummaryComponent } from '../summary/summary.component';
import { ActorViewComponent } from '../actor-view/actor-view.component';
//angular material imports
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit{
  movies: any[] = [];
  //favorite movies
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    //get favorite movies from user's list
    this.getFavoriteMovies();
  }

  /**gets movies from the api call and returns data */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  //**gets favorite movies from the user data */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavorites().subscribe((res: any) => {
      this.favoriteMovies = res;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * check if a movie is included in the user's list of favorite movies
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }

  /**opens the genre dialog */
  openGenre(name: string, description: string): void{
    this.dialog.open(GenreViewComponent,{
      data: {
        Name: name,
        Description: description
      }
    })
  }
  //**opens the actor dialog */
  openActor(name: string, bio: string, birth: Date, death: Date): void{
    this.dialog.open(ActorViewComponent,{
      data: {
        Name: name,
        Bio: bio,
        Death: death,
        Birthdate: birth,
      }
    })
  }

  //**opens the summary(synopsis) dialog */
  openSummary(title: string, description: string): void{
    this.dialog.open(SummaryComponent,{
      data: {
        Title: title,
        Description: description,
      }
    })
  }

  /**
   * opens the director dialog
   */
  openDirector(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent,
      {
        data: {
          Name: name,
          Bio: bio,
          Birth: birth,
          Death: death
        }
      });
  }

  /**
   * adds a movie to the list of favorite movies via an API call
   * @param id
   * @function addFavoriteMovie
   */
  //i don't know the movie id here, it will be passed from the template
   addFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * removes a movie from the list of favorite movies via an API call
   * @param id
   * @function removeFavoriteMovie
   */

   removeFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }
}
