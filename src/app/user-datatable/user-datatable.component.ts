import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersDataService } from '../users-data.service';

@Component({
  selector: 'app-user-datatable',
  templateUrl: './user-datatable.component.html',
  styleUrls: ['./user-datatable.component.scss'],
})
export class UserDatatableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  dataSource = new MatTableDataSource<any>();

  constructor(private dataService: UsersDataService) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataService.getSampleData();
  }
}
