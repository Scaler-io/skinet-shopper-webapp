import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidateEmail } from "src/app/shared/validators/emailCustomValidator";

export class SkinetLoginFormGroup {
    private static fb: FormBuilder = new FormBuilder();
    
    public static loginForm: FormGroup; 

    public static createLoginForm(): FormGroup { 
        this.loginForm = this.fb.group({
            'email': ['', [Validators.required, ValidateEmail]],
            'password': ['', Validators.required]
        });     

         return this.loginForm;
    }

}