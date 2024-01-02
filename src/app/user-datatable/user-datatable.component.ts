// user-datatable.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user.model'; // Import the UserData model

@Component({
  selector: 'app-user-datatable',
  templateUrl: './user-datatable.component.html',
  styleUrls: ['./user-datatable.component.scss'],
})
export class UserDatatableComponent implements OnInit {
  @Input() userData!: User[];
  displayedColumns: string[] = ['სახელი', 'გვარი', 'სქესი', 'პირადი ნომერი', 'მობილურის ნომერი', 'ლეგალური მისამართი', 'იურიდიული მისამართი'];
  dataSource = new MatTableDataSource<User>();

  ngOnInit(): void {
    this.dataSource.data = this.userData;
  }
}
