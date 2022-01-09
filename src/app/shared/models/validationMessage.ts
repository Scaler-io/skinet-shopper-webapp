export interface IValidationMessage {
    error: string;
    formControlName?: string[] | string | null;
    message: string;
}