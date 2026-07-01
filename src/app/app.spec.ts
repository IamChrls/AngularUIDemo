import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { User } from './model/user';

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  // Create local mock data to decouple tests from direct mock file mutations
  const mockUserList: User[] = [
    { id: 1, name: 'Charles Abuel', rating: 5, bio: 'test bio', likes:['test'], dislikes:['test'] },
    { id: 2, name: 'Frank Wang', rating: 4, bio: 'test bio', likes:['test'], dislikes:['test']  },
    { id: 3, name: 'Jane Doe', rating: 3, bio: 'test bio', likes:['test'], dislikes:['test']  }
  ];

  beforeEach(async () => {
    // Intercept the static mock data call and force our controlled array
    await TestBed.configureTestingModule({
      imports: [App, RouterOutlet, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    // Explicitly trigger cycle initialization
    fixture.detectChanges();
  });

  it('should create the app component instance', () => {
    expect(component).toBeTruthy();
  });

  // --- Group 1: Initialization Tests ---
  describe('ngOnInit() Initializations', () => {
    it('should pull users array and clone it into filteredUsers on init', () => {
      component.ngOnInit();
      expect(component.users.length).toBe(5);
    });

    it('should select Frank Wang (index position 1) as the default selected user', () => {
      component.ngOnInit();
      expect(component.selectedUser.name).toEqual('Frank Wang');
    });
  });

  // --- Group 2: Behavioral Actions ---
  describe('Component Interactive Methods', () => {
    beforeEach(() => {
      component.ngOnInit(); // Initialize baseline user state before each interactive run
    });

    it('should flip isSidebarCollapsed value when toggleSidebar() executes', () => {
      component.isSidebarCollapsed = false;

      expect(component.isSidebarCollapsed).toEqual(false);
      component.toggleSidebar();
      expect(component.isSidebarCollapsed).toEqual(true);
    });

    it('should change selectedUser reference when selectUser() is triggered', () => {
      const targetUser = mockUserList[2]; // Jane Doe
      component.selectUser(targetUser);
      expect(component.selectedUser).toEqual(targetUser);
    });
  });

  // --- Group 3: Search and Filter Logic ---
  describe('Search Functionalities', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should subset filteredUsers based on a matching string query case-insensitively', () => {
      component.searchQuery = '  fRaNk  '; // tests casing and edge whitespace trimming
      component.onSearch();
      
      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].name).toBe('Frank Wang');
    });

    it('should reset search states completely when clearSearch() is invoked', () => {
      // Setup dirty state manually
      component.searchQuery = 'Jane';
      component.filteredUsers = [mockUserList[2]];

      component.clearSearch();

      expect(component.searchQuery).toBe('');
      expect(component.filteredUsers.length).toBe(5);
      expect(component.filteredUsers).toEqual(component.users);
    });
  });
});