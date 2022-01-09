import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  returnUrl: string;

  constructor(private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    this.loginForm = SkinetLoginFormGroup.createLoginForm(); 
  }

  onSubmitLoginCreds(){
    this.loginForm.markAllAsTouched();
    this.accountService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl)
      },
      error: (error) => {
        console.log(error);
        this.loginForm = AccountFormGroupHelper.applyUnauthorisedBackendError(
          this.loginForm, 
          'email', 
          true
        );
      }
    });
  }

}
