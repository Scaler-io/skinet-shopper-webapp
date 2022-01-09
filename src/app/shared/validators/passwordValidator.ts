import { AbstractControl } from "@angular/forms";

export function PasswordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null{
    const parent = control.parent;
    
    if(control.value != parent?.get('newPassword').value){  
        return { 'password_mismatch' : true}
    }

    return null;
}

export function StrongPasswordPatternValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const pattern = /(?=^.{6,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    
    if(!pattern.test(control.value)){
        return {'pattern': true}
    }
    return null;
}