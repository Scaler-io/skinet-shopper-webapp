import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { validationMessage } from '../../validators/validationMessage';

@Component({
  selector: 'skinet-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() public form: FormGroup;
  @Input() public control: string;

  constructor() { }

  ngOnInit(): void {
    this.getErrorMessage();
  }

  public getErrorMessage(): string{
    return validationMessage(this.control, this.form);
  }
}
