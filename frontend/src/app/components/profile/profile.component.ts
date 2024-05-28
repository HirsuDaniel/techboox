import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
      this.auth.changeAuthStatus(false);
      this.router.navigate(['/login']);
    }
}