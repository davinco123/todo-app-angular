import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.scss'],
})
export class AuthHomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  toSignUp() {
    this.router.navigate(['signup'], { relativeTo: this.route });
  }

  toSignIn() {
    this.router.navigate(['signin'], { relativeTo: this.route });
  }

  ngOnInit(): void {}
}
