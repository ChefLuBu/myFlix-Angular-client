import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {
   user: any = {}

   @Input() userUpdateData = { Username: '', Password: '', Email: '', Birthday:'' };

  constructor(public UserRegistrationService: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

ngOnInit(): void {
   this.getUser();
}
/**
 * Get user data from API
 * @function getUser
 */

getUser(): void {
  this.UserRegistrationService.getUser().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user;
    });
  }

/**
 * Warning notification for account deletion and success
 * @function onDeleteAccount
 */
onDeleteAccount(): void {
  if (confirm('Are you sure you want to delete your account? This action cannnot be undone.')) {
    this.router.navigate(['welcome']).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.snackBar.open('You have successfully deleted your account!', 'OK', {
        duration: 3000
      });
    });
  }

  this.UserRegistrationService.deleteUser().subscribe(res=>{
    console.log('deleteAccountRes:', res);
  })
}

/**
 * Update user info
 * Make API call to update the user, reset the localstorage and
 *  reload the profile-page
 * @function onUserUpdate
 */
onUserUpdate(): void {
  this.UserRegistrationService.updateUser(this.userUpdateData).subscribe((response) => {
    // Logic for a successful user registration goes here! (To be implemented)
    localStorage.setItem('username', response.Username);
    this.snackBar.open('Profile updated successfully', 'OK', {
      duration: 4000
    });
    window.location.reload();
  }, (response) => {
    //Error response
    //console.log('onUserUpdate() response2:', response);
    this.snackBar.open(response.errors[0].msg, 'OK', {
      duration: 6000
    });
  });
}
}