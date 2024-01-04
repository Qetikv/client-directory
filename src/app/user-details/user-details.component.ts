// user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../users-data.service';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserAccountFormDialogComponent } from '../user-account-form-dialog/user-account-form-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  userId: number | null = null;
  isEditable = false; // Track whether the form is in edit mode
  showUserAccountFormDialog = false; // Track whether to show the user account form dialog

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private usersDataService: UsersDataService,
    private dialogService: UsersDataService,  // Inject DialogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = parseInt(params['userId'], 10);

      if (this.userId) {
        this.user = this.usersDataService.getUserById(this.userId);
      }
    });
  }

  // Toggle between edit and view mode
  toggleEditMode(): void {
    this.isEditable = !this.isEditable;
  }

  // Save changes to the user object
  saveChanges(): void {
    // Add logic to save changes to the backend or update the local user data
    console.log('Saving changes:', this.user);
    // You can make an HTTP request to update the user data on the server here
    // For simplicity, this example just logs the changes to the console
    this.isEditable = false; // Switch back to view mode after saving
  }

  // Open the user account form dialog
  openUserAccountFormDialog(): void {
    const dialogRef = this.dialog.open(UserAccountFormDialogComponent, {
      width: '600px',
      height: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  // Close the user account form dialog
//   closeUserAccountFormDialog(result: any): void {
//     if (result) {
//       // Handle the result (saved data) here if needed
//       console.log('User Account Form Dialog closed with result:', result);
//       // Update the user object with the new account data
//       if (!this.user?.accounts) {
//         this.user!. = [];
//       }
//       this.user!.accounts.push(result);
//     }

//     this.showUserAccountFormDialog = false;
//   }
// }
}