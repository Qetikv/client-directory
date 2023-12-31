import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '600px',
      height: '600px'
    });

    dialogRef.afterOpened().subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
