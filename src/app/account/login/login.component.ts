import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AccountFormGroupHelper } from '../form-groups/accountFormHelper';
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
    this.loginForm.markAllAsTouched();
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/shop')
      },
      error: (error) => {
        console.log(error);
        this.loginForm = AccountFormGroupHelper.applyUnauthorisedBackendError(
          this.loginForm, 'email', true
        );
      }
    });
  }

}
