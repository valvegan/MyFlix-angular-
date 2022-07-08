import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
//to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'profile-page',
  templateUrl: 'profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  //pick up the user data
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data and sets the data into the variable "user"
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
      return this.user;
    });
  }
  /**opens the dialog where the user can edit their profile details */
  openDialog() {
    this.dialog.open(EditProfileComponent);
  }

  /**deletes the entire profile and redirects the user to the welcome page */
  deleteProfile(): void {
    //"confirm" opens a "default" dialog popul
    if (confirm('Are you sure you want to delete your profile permanently?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000,
        });
      });
      //delete the user from the database
      this.fetchApiData.deleteUser(this.user.username).subscribe((res) => {
        localStorage.clear();
      });
    }
  }
}

/**component to show the current details of the logged in user */
@Component({
  selector: 'profile-info',
  templateUrl: 'profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
})
export class EditProfileComponent implements OnInit {
  /**
   * Input values will be userData
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialogRef: MatDialogRef<EditProfileComponent>
  ) {}

  ngOnInit(): void {}

  /**
   * allows user to edit their data, such as Username, password, email, and birthday
   */
  editUser(): void {
    console.log(this.userData); //thats the new user details
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      //set new username to localstorage
      localStorage.setItem('user', result.username);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000,
      });
    });
  }
}
