import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**navigation to the movies page */
  toMovies():void{
    this.router.navigate(['movies'])
  }
  /**navigation to the profile page */
  toProfile():void{
    this.router.navigate(['profile'])
  }
  /**navigation to the welcome page after logging out */
  logOut():void{
    this.router.navigate(['welcome'])
  }

}
