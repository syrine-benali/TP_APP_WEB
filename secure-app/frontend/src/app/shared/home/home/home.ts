import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth-services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  public readonly auth = inject(AuthService);


  logout(){
    this.auth.logout();
  }

  // computed signal exposing the display name / login for the template
  readonly displayName = computed(() => {
    const u = this.auth.currentUser();
    if (!u) return null;
    // Prefer login (username). Fallback to firstname + name when login not present.
    const fallback = [u.firstname, u.name].filter(Boolean).join(' ');
    return u.login ?? (fallback || null);
  })

}
