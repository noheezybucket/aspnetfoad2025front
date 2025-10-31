import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent {
@Input() message!: string;
}
