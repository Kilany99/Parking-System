import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDto, CreateUserDto, UpdateUserDto } from '../../models/DTOs/user.dto';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../..//modules/shared/shared.module';
import { AppModule } from '../../app.module';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    GridModule, // Import GridModule here
    InputsModule,
    DialogsModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListModule,
    
  ]
})
export class UserComponent implements OnInit {
  public users: UserDto[] = [];
  public gridData: GridDataResult = { data: [], total: 0 };
  public pageSize = 10;
  public skip = 0;

  public selectedUser: UserDto | null = null;
  public isNew: boolean = false;
  public isDialogOpen: boolean = false;

  public userForm: FormGroup;

  constructor(private userService: UserService) {
    // Initialize the form
    this.userForm = new FormGroup({
      id: new FormControl(null),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.loadGrid();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  private loadGrid(): void {
    this.gridData = {
      data: this.users.slice(this.skip, this.skip + this.pageSize),
      total: this.users.length,
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGrid();
  }

  public addUser(): void {
    this.isNew = true;
    this.selectedUser = null;
    this.userForm.reset();
    this.isDialogOpen = true;
  }

  public editUser(user: UserDto): void {
    this.isNew = false;
    this.selectedUser = user;
    this.userForm.reset(user);
    this.isDialogOpen = true;
  }

  public saveUser(): void {
    if (this.userForm.valid) {
      const userDto = this.userForm.value as CreateUserDto | UpdateUserDto;
      if (this.isNew) {
        this.userService.createUser(userDto as CreateUserDto).subscribe(
          (result) => {
            this.loadUsers();
            this.isDialogOpen = false;
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      } else {
        this.userService.updateUser(this.userForm.value.id, userDto as UpdateUserDto).subscribe(
          (result) => {
            this.loadUsers();
            this.isDialogOpen = false;
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      }
    }
  }

  public deleteUser(user: UserDto): void {
    if (confirm(`Are you sure you want to delete user ${user.name}?`)) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  public closeDialog(): void {
    this.isDialogOpen = false;
  }
}