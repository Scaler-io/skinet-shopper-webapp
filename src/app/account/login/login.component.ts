import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { validationMessage } from 'src/app/shared/validators/validationMessage';
import { AccountService } from '../account.service';
import { SkinetLoginFormGroup } from '../form-groups/skinetLogin';

@Component({
  selector: 'skinet-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = SkinetLoginFormGroup.createLoginForm(); 
  }

  onSubmitLoginCreds(){
    if(this.loginForm.valid){
      this.accountService.login(this.loginForm.value).subscribe({
        next: () => this.router.navigateByUrl('/shop'),
        error: (error) => console.log(error)
      });
    }
  }
}
