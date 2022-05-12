import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/Services/account.service';
import { Ilogin } from 'src/app/ViewModels/ilogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:Ilogin;
  Token:any;
  constructor(private accountService:AccountService) {
    this.user={userName:"",password:""};
  }

  ngOnInit(): void {
  }

  login()
  {
    this.accountService.loginUser(this.user).subscribe(token=>{
      this.Token=token;
      localStorage.setItem("token",this.Token.token);
    });
  }
}
