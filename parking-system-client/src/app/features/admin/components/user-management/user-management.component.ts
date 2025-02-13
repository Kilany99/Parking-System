import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2>User Management</h2>
    
    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
        <td mat-cell *matCellDef="let user">{{user.name}}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
        <td mat-cell *matCellDef="let user">{{user.email}}</td>
      </ng-container>

      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
        <td mat-cell *matCellDef="let user">{{user.role}}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let user">
          <button mat-icon-button color="primary" (click)="editUser(user)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="deleteUser(user)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator 
      [pageSize]="10" 
      [pageSizeOptions]="[5, 10, 25, 100]"
      showFirstLastButtons>
    </mat-paginator>
  `,
  styles: [`
    table {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['name', 'email', 'role', 'actions'];
  dataSource = [];

  ngOnInit(): void {
    // TODO: Implement user service and fetch real data
  }

  editUser(user: any): void {
    // TODO: Implement edit functionality
  }

  deleteUser(user: any): void {
    // TODO: Implement delete functionality
  }
}
