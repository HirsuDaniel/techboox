import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { CvService } from '../../services/cv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public loggedIn: boolean = false;
  public cvId: number | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService,
    private cvService: CvService
  ) {}

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value => {
      this.loggedIn = value;
      if (this.loggedIn) {
        this.fetchUserCvId();
      } else {
        this.cvId = null;
      }
    });
  }

  fetchUserCvId(): void {
    const userId = this.token.getUserId();
    if (userId !== null) {
      this.cvService.getCV(userId).subscribe(data => {
        if (data) {
          this.cvId = data.id; // Adjust based on your API response
        }
      });
    }
  }

    logout(): void {
      this.token.remove();
      this.router.navigate(['login']);
    }
}
