import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
//angular material imports
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    //dependencies
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfilePageComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**editDetails() allows users to update their details */
  editDetails(): void {
    this.fetchApiData.editUser(this.userData).subscribe((res) => {
      this.dialogRef.close();
      this.snackBar.open('Profile updated', 'ok', {
        duration: 2000,
      });
      //
      if (this.userData.username || this.userData.password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please log in again with your new details', 'ok', {
          duration: 2000,
        });
      }
    });
  }
}
