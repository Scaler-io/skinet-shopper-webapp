import { AbstractControl } from "@angular/forms";

export function ValidateEmail(control: AbstractControl): { [key: string]: boolean } | null {
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if(!pattern.test(control.value)){
        return {'pattern': true }
    }

    return null;
}