import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './model/user';
import { UserDataMock } from './mocks/user-data.mock';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  isSidebarCollapsed = false;
  isDropdownOpen = false;

  searchQuery: string = '';
  currentUser: string = 'Admin';
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser!: User;

  ngOnInit() {
    this.users = UserDataMock.userDataList;
    this.filteredUsers = [...this.users];

    //set Frank Wang as default selected user
    this.selectedUser = this.users[1];
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  sendMessage(): void {
    alert(`Sending message to ${this.selectedUser.name}`);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredUsers = this.filteredUsers.filter(x => x.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase()));
    }
    else
    {
      this.clearSearch();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredUsers = [...this.users];
  }

  viewProfile(): void {
    alert('Developed by Charles Abuel');
  }

  logout(): void {
    alert('Thank you. Goodbye.');
  }

  
}
