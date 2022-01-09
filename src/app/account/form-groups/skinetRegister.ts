import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DuplicateEmail, ValidateEmail } from "src/app/shared/validators/emailCustomValidator";
import { PasswordMatchValidator, StrongPasswordPatternValidator } from "src/app/shared/validators/passwordValidator";
import { AccountService } from "../account.service";

export class SkinetRegisterFormGroup{
    private static fb: FormBuilder =  new FormBuilder();
    public static registerForm: FormGroup;

    public static createRegistrationForm(accountService: AccountService): FormGroup { 
        this.registerForm = this.fb.group({
            'email': ['', [Validators.required, ValidateEmail],
                [DuplicateEmail(accountService)]
            ],
            'displayName': ['', Validators.required],
            'newPassword': ['', [Validators.required, StrongPasswordPatternValidator]],
            'passwordConfirm': ['', [Validators.required, PasswordMatchValidator]]
        });

        return this.registerForm;
    }
}   