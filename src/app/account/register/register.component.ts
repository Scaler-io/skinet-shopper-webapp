import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterPayloadMapper } from 'src/app/shared/mappers/register-payload.mapper';
import { AccountService } from '../account.service';
import { SkinetRegisterFormGroup } from '../form-groups/skinetRegister';

@Component({
  selector: 'skinet-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fb = new FormBuilder();
  
  constructor(private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = SkinetRegisterFormGroup.createRegistrationForm(this.accountService);
  }

  onSubmitRegistrationDetails(): void {
    if(this.registerForm.valid){
      const payload = UserRegisterPayloadMapper.map(this.registerForm);
      this.accountService.register(payload).subscribe({
        next: () => {
          this.router.navigateByUrl('/shop');
        },
        error: (error) => console.log(error)
      });
    }else{
      this.registerForm.markAllAsTouched();
    }
  }
}
