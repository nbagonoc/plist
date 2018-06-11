import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import "rxjs/add/operator/map";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.displayName;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  // onLogin() {
  //   this.authService.login();
  // }

  onLogout() {
    this.authService.logout();
  }
}
