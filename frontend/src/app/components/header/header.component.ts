import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public loggedIn: boolean = false;

    constructor(private auth: AuthService, private router: Router, private token:TokenService) {}

    ngOnInit(): void {
        this.auth.authStatus.subscribe(
            value => {
                this.loggedIn = value;
            }
        );
    }

    logout(): void {
      this.token.remove();
      this.router.navigate(['login']);
    }
}
