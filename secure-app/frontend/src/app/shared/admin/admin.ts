import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../users/user';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {

  private readonly userService = inject(UserService)
  readonly users = this.userService.users
  readonly loading = this.userService.loading
  readonly error = this.userService.error

  // Charge la liste à l'arrivée sur la page
  constructor(){
    // fetch once on component init; effect ensures it runs in Angular's reactive context
    effect(() => {
      this.userService.fetchAll()
    })
  }

  refresh(){
    this.userService.fetchAll()
  }

  trackById(index: number, item: { id: number }){
    return item?.id ?? index
  }

  // Helpers returning plain values for template consumption
  getList(){
    return this.users()
  }

  isLoading(){
    return this.loading()
  }

  errorMsg(){
    return this.error()
  }

}
